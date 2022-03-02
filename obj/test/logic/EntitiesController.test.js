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
const EntityTypeV1_1 = require("../../src/data/version1/EntityTypeV1");
const EntitiesMemoryPersistence_1 = require("../../src/persistence/EntitiesMemoryPersistence");
const EntitiesController_1 = require("../../src/logic/EntitiesController");
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
suite('EntitiesController', () => {
    let persistence;
    let controller;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new EntitiesMemoryPersistence_1.EntitiesMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        controller = new EntitiesController_1.EntitiesController();
        controller.configure(new pip_services3_commons_nodex_1.ConfigParams());
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_2.Descriptor('pip-service-data', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        yield persistence.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create the first entity
        let entity = yield controller.createEntity(null, ENTITY1);
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);
        // Create the second entity
        entity = yield controller.createEntity(null, ENTITY2);
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);
        // Get all entities
        let page = yield controller.getEntities(null, new pip_services3_commons_nodex_4.FilterParams(), new pip_services3_commons_nodex_5.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        let entity1 = page.data[0];
        // Update the entity
        entity1.name = 'ABC';
        entity = yield controller.updateEntity(null, entity1);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);
        // Get entity by name
        entity = yield controller.getEntityByName(null, entity1.name);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        // Delete the entity
        entity = yield controller.deleteEntityById(null, entity1.id);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        // Try to get deleted entity
        entity = yield controller.getEntityById(null, entity1.id);
        assert.isNull(entity || null);
    }));
});
//# sourceMappingURL=EntitiesController.test.js.map