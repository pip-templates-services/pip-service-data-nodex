const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { TestCommandableHttpClient } from 'pip-services3-rpc-nodex';

import { EntityV1 } from '../../../src/data/version1/EntityV1';
import { EntityTypeV1 } from '../../../src/data/version1/EntityTypeV1';
import { EntitiesMemoryPersistence } from '../../../src/persistence/EntitiesMemoryPersistence';
import { EntitiesController } from '../../../src/logic/EntitiesController';
import { EntitiesCommandableHttpServiceV1 } from '../../../src/services/version1/EntitiesCommandableHttpServiceV1';

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

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EntitiesCommandableHttpServiceV1', () => {
    let persistence: EntitiesMemoryPersistence;
    let controller: EntitiesController;
    let service: EntitiesCommandableHttpServiceV1;
    let client: TestCommandableHttpClient;

    setup(async () => {
        persistence = new EntitiesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new EntitiesController();
        controller.configure(new ConfigParams());

        service = new EntitiesCommandableHttpServiceV1();
        service.configure(httpConfig);

        client = new TestCommandableHttpClient('v1/entities');
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('entities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('entities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('entities', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        await persistence.open(null);
        await service.open(null);
        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
        await service.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        // Create the first entity
        let entity = await client.callCommand<EntityV1>(
            'create_entity',
            null, 
            {
                entity: ENTITY1
            }
        );
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);


        // Create the second entity
        entity = await client.callCommand<EntityV1>(
            'create_entity',
            null, 
            {
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
        let page = await client.callCommand<DataPage<EntityV1>>(
            'get_entities',
            null, 
            {
                filter: new FilterParams(),
                paging: new PagingParams()
            }
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        let entity1 = page.data[0];

        // Update the entity
        entity1.name = 'ABC';

        entity = await client.callCommand<EntityV1>(
            'update_entity',
            null, 
            {
                entity: entity1
            }
        );
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);

        // Get entity by name
        entity = await client.callCommand<EntityV1>(
            'get_entity_by_name',
            null, 
            {
                name: entity1.name
            }
        );
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Delete the entity
        entity = await client.callCommand<EntityV1>(
            'delete_entity_by_id',
            null, 
            {
                entity_id: entity1.id
            }
        );
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Try to get deleted entity
        entity = await client.callCommand<EntityV1>(
            'get_entity_by_id',
            null, 
            {
                entity_id: entity1.id
            }
        );
        assert.isNull(entity || null);
    });

});