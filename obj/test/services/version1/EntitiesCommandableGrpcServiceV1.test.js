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
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const EntityTypeV1_1 = require("../../../src/data/version1/EntityTypeV1");
const EntitiesMemoryPersistence_1 = require("../../../src/persistence/EntitiesMemoryPersistence");
const EntitiesController_1 = require("../../../src/logic/EntitiesController");
const EntitiesCommandableGrpcServiceV1_1 = require("../../../src/services/version1/EntitiesCommandableGrpcServiceV1");
const ENTITY1 = {
    id: '1',
    name: '00001',
    type: EntityTypeV1_1.EntityTypeV1.Type1,
    site_id: '1',
    content: 'ABC'
};
const ENTITY2 = {
    id: '2',
    name: '00002',
    type: EntityTypeV1_1.EntityTypeV1.Type2,
    site_id: '1',
    content: 'XYZ'
};
let grpcConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('EntitiesCommandableGrpcServiceV1', () => {
    let persistence;
    let controller;
    let service;
    let client;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new EntitiesMemoryPersistence_1.EntitiesMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        controller = new EntitiesController_1.EntitiesController();
        controller.configure(new pip_services3_commons_nodex_1.ConfigParams());
        service = new EntitiesCommandableGrpcServiceV1_1.EntitiesCommandableGrpcServiceV1();
        service.configure(grpcConfig);
        client = new pip_services3_grpc_nodex_1.TestCommandableGrpcClient('v1.entities');
        client.configure(grpcConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'service', 'grpc', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield persistence.open(null);
        yield service.open(null);
        yield client.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
        yield service.close(null);
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create the first entity
        let entity = yield client.callCommand('create_entity', null, {
            entity: ENTITY1
        });
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);
        // Create the second entity
        entity = yield client.callCommand('create_entity', null, {
            entity: ENTITY2
        });
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);
        // Get all entities
        let page = yield client.callCommand('get_entities', null, {
            filter: new pip_services3_commons_nodex_4.FilterParams(),
            paging: new pip_services3_commons_nodex_5.PagingParams()
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        let entity1 = page.data[0];
        // Update the entity
        entity1.name = 'ABC';
        entity = yield client.callCommand('update_entity', null, {
            entity: entity1
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);
        // Get entity by name
        entity = yield client.callCommand('get_entity_by_name', null, {
            name: entity1.name
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        // Delete the entity
        entity = yield client.callCommand('delete_entity_by_id', null, {
            entity_id: entity1.id
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        // Try to get deleted entity
        entity = yield client.callCommand('get_entity_by_id', null, {
            entity_id: entity1.id
        });
        assert.isNull(entity || null);
    }));
});
//# sourceMappingURL=EntitiesCommandableGrpcServiceV1.test.js.map