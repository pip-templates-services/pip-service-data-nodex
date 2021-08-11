const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../../src/data/version1/EntityV1';
import { EntityTypeV1 } from '../../src/data/version1/EntityTypeV1';
import { EntitiesLambdaFunction } from '../../src/containers/EntitiesLambdaFunction';

const ENTITY1: EntityV1 = {
    id: '1',
    name: '00001',
    type: EntityTypeV1.Type1,
    site_id: '1',
    content: 'ABC'
};
const ENTITY2: EntityV1 = {
    id: '2',
    name: '00002',
    type: EntityTypeV1.Type2,
    site_id: '1',
    content: 'XYZ'
};

suite('EntitiesLambdaFunction', ()=> {
    let lambda: EntitiesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'entities:persistence:memory:default:1.0',
            'controller.descriptor', "entities:controller:default:default:1.0"
        );

        lambda = new EntitiesLambdaFunction();
        lambda.configure(config);

        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        // Create one entity
        let entity = await lambda.act(
            {
                role: 'entities',
                cmd: 'create_entity',
                entity: ENTITY1
            }
        );
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);

        let entity1 = entity;

        // Create another entity
        entity = await lambda.act(
            {
                role: 'entities',
                cmd: 'create_entity',
                entity: ENTITY2
            }
        );
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);

        // Get all entities
        let page = await lambda.act(
            {
                role: 'entities',
                cmd: 'get_entities',
                filter: {}
            }
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the entity
        entity1.name = 'Updated Entity 1';

        entity = await lambda.act(
            {
                role: 'entities',
                cmd: 'update_entity',
                entity: entity1
            }
        );
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('Updated Entity 1', entity.name);

        // Delete account
        entity = await lambda.act(
            {
                role: 'entities',
                cmd: 'delete_entity_by_id',
                entity_id: entity1.id,
            }
        );

        // Try to get delete entity
        entity = await lambda.act(
            {
                role: 'entities',
                cmd: 'get_entity_by_id',
                entity_id: entity1.id,
            }
        );
        assert.isNull(entity || null);
    });

});