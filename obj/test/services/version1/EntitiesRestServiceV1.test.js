"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require('restify');
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const EntitiesMemoryPersistence_1 = require("../../../src/persistence/EntitiesMemoryPersistence");
const EntitiesController_1 = require("../../../src/logic/EntitiesController");
const EntitiesRestServiceV1_1 = require("../../../src/services/version1/EntitiesRestServiceV1");
const EntityTypeV1_1 = require("../../../src/data/version1/EntityTypeV1");
const ENTITY1 = {
    id: '1',
    type: EntityTypeV1_1.EntityTypeV1.Type1,
    site_id: '1',
    name: '00001',
    content: 'ABC'
};
const ENTITY2 = {
    id: '2',
    type: EntityTypeV1_1.EntityTypeV1.Type2,
    site_id: '1',
    name: '00002',
    content: 'XYZ'
};
let httpConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('EntitiesRestServiceV1', () => {
    let service;
    let rest;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let persistence = new EntitiesMemoryPersistence_1.EntitiesMemoryPersistence();
        let controller = new EntitiesController_1.EntitiesController();
        service = new EntitiesRestServiceV1_1.EntitiesRestServiceV1();
        service.configure(httpConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
    }));
    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create the first entity
        let entity = yield new Promise((resolve, reject) => {
            rest.post('/v1/entities/entities', ENTITY1, (err, req, res, entity) => {
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
        entity = yield new Promise((resolve, reject) => {
            rest.post('/v1/entities/entities', ENTITY2, (err, req, res, entity) => {
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
        let page = yield new Promise((resolve, reject) => {
            rest.get('/v1/entities/entities', (err, req, res, page) => {
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
        entity = yield new Promise((resolve, reject) => {
            rest.put('/v1/entities/entities', entity1, (err, req, res, entity) => {
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
        entity = yield new Promise((resolve, reject) => {
            rest.get('/v1/entities/entities/name/' + entity1.name, (err, req, res, entity) => {
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
        entity = yield new Promise((resolve, reject) => {
            rest.del('/v1/entities/entities/' + entity1.id, (err, req, res, entity) => {
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
        entity = yield new Promise((resolve, reject) => {
            rest.get('/v1/entities/entities/' + entity1.id, (err, req, res, entity) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
        assert.isEmpty(entity || null);
    }));
});
//# sourceMappingURL=EntitiesRestServiceV1.test.js.map