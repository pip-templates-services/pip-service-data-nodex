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
exports.EntitiesPersistenceFixture = void 0;
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const EntityTypeV1_1 = require("../../src/data/version1/EntityTypeV1");
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
const ENTITY3 = {
    id: '3',
    name: '00003',
    type: EntityTypeV1_1.EntityTypeV1.Type1,
    site_id: '2',
    content: 'DEF'
};
class EntitiesPersistenceFixture {
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
    testCreateEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create the first entity
            let entity = yield this._persistence.create(null, ENTITY1);
            assert.isObject(entity);
            assert.equal(ENTITY1.name, entity.name);
            assert.equal(ENTITY1.site_id, entity.site_id);
            assert.equal(ENTITY1.type, entity.type);
            assert.equal(ENTITY1.name, entity.name);
            assert.isNotNull(entity.content);
            // Create the second entity
            entity = yield this._persistence.create(null, ENTITY2);
            assert.isObject(entity);
            assert.equal(ENTITY2.name, entity.name);
            assert.equal(ENTITY2.site_id, entity.site_id);
            assert.equal(ENTITY2.type, entity.type);
            assert.equal(ENTITY2.name, entity.name);
            assert.isNotNull(entity.content);
            // Create the third entity
            entity = yield this._persistence.create(null, ENTITY3);
            assert.isObject(entity);
            assert.equal(ENTITY3.name, entity.name);
            assert.equal(ENTITY3.site_id, entity.site_id);
            assert.equal(ENTITY3.type, entity.type);
            assert.equal(ENTITY3.name, entity.name);
            assert.isNotNull(entity.content);
        });
    }
    testCrudOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create items
            yield this.testCreateEntities();
            // Get all entities
            let page = yield this._persistence.getPageByFilter(null, new pip_services3_commons_nodex_1.FilterParams(), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 3);
            let entity1 = page.data[0];
            // Update the entity
            entity1.name = 'ABC';
            let entity = yield this._persistence.update(null, entity1);
            assert.isObject(entity);
            assert.equal(entity1.id, entity.id);
            assert.equal('ABC', entity.name);
            // Get entity by name
            entity = yield this._persistence.getOneByName(null, entity1.name);
            assert.isObject(entity);
            assert.equal(entity1.id, entity.id);
            // Delete the entity
            entity = yield this._persistence.deleteById(null, entity1.id);
            assert.isObject(entity);
            assert.equal(entity1.id, entity.id);
            // Try to get deleted entity
            entity = yield this._persistence.getOneById(null, entity1.id);
            assert.isNull(entity || null);
        });
    }
    testGetWithFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create items
            yield this.testCreateEntities();
            // Filter by id
            let page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('id', '1'), new pip_services3_commons_nodex_2.PagingParams());
            assert.lengthOf(page.data, 1);
            // Filter by name
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('name', '00002'), new pip_services3_commons_nodex_2.PagingParams());
            assert.lengthOf(page.data, 1);
            // Filter by names
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('names', '00001,00003'), new pip_services3_commons_nodex_2.PagingParams());
            assert.lengthOf(page.data, 2);
            // Filter by site_id
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('site_id', '1'), new pip_services3_commons_nodex_2.PagingParams());
            assert.lengthOf(page.data, 2);
        });
    }
}
exports.EntitiesPersistenceFixture = EntitiesPersistenceFixture;
//# sourceMappingURL=EntitiesPersistenceFixture.js.map