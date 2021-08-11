const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { EntitiesMemoryPersistence } from '../../../src/persistence/EntitiesMemoryPersistence';
import { EntitiesController } from '../../../src/logic/EntitiesController';
import { EntitiesRestServiceV1 } from '../../../src/services/version1/EntitiesRestServiceV1';
import { EntityTypeV1 } from '../../../src/data/version1/EntityTypeV1';
import { EntityV1 } from '../../../src/data/version1/EntityV1';

const ENTITY1: EntityV1 = {
    id: '1',
    type: EntityTypeV1.Type1,
    site_id: '1',
    name: '00001',
    content: 'ABC'
};
const ENTITY2: EntityV1 = {
    id: '2',
    type: EntityTypeV1.Type2,
    site_id: '1',
    name: '00002',
    content: 'XYZ'
};

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EntitiesRestServiceV1', ()=> {
    let service: EntitiesRestServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new EntitiesMemoryPersistence();
        let controller = new EntitiesController();

        service = new EntitiesRestServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('entities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('entities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('entities', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        // Create the first entity
        let entity = await new Promise<EntityV1>((resolve, reject) => {
            rest.post('/v1/entities/entities',
            ENTITY1,
            (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);

        // Create the second entity
        entity = await new Promise<EntityV1>((resolve, reject) => {
            rest.post('/v1/entities/entities',
            ENTITY2,
            (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);

        // Get all entities
        let page = await new Promise<DataPage<EntityV1>>((resolve, reject) => {
            rest.get('/v1/entities/entities',
            (err, req, res, page) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(page);
            });
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        let entity1 = page.data[0];

        // Update the entity
        entity1.name = 'ABC';

        entity = await new Promise<EntityV1>((resolve, reject) => {
            rest.put('/v1/entities/entities',
            entity1,
            (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);

        // Get entity by name
        entity = await new Promise<EntityV1>((resolve, reject) => {
            rest.get('/v1/entities/entities/name/' + entity1.name,
            (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Delete the entity
        entity = await new Promise<EntityV1>((resolve, reject) => {
            rest.del('/v1/entities/entities/' + entity1.id,
            (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Try to get deleted entity
        entity = await new Promise<EntityV1>((resolve, reject) => {
            rest.get('/v1/entities/entities/' + entity1.id,
            (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isEmpty(entity || null);
    });
});