const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../../src/data/version1/EntityV1';
import { EntityTypeV1 } from '../../src/data/version1/EntityTypeV1';
import { EntitiesMemoryPersistence } from '../../src/persistence/EntitiesMemoryPersistence';
import { EntitiesController } from '../../src/logic/EntitiesController';

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

suite('EntitiesController', () => {
    let persistence: EntitiesMemoryPersistence;
    let controller: EntitiesController;

    setup(async () => {
        persistence = new EntitiesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new EntitiesController();
        controller.configure(new ConfigParams());

        let references = References.fromTuples(
            new Descriptor('entities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('entities', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        // Create the first entity
        let entity = await controller.createEntity(null, ENTITY1);
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);

        // Create the second entity
        entity = await controller.createEntity(null, ENTITY2);
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);

        // Get all entities
        let page = await controller.getEntities(null, new FilterParams(), new PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        let entity1 = page.data[0];

        // Update the entity
        entity1.name = 'ABC';

        entity = await controller.updateEntity(null, entity1);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);

        // Get entity by name
        entity = await controller.getEntityByName(null, entity1.name);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Delete the entity
        entity = await controller.deleteEntityById(null, entity1.id);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Try to get deleted entity
        entity = await controller.getEntityById(null, entity1.id);
        assert.isNull(entity || null);
    });

});