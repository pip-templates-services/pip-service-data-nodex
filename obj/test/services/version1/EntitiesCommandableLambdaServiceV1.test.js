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
const EntityTypeV1_1 = require("../../../src/data/version1/EntityTypeV1");
const EntitiesLambdaFunction_1 = require("../../../src/containers/EntitiesLambdaFunction");
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
suite('EntitiesCommandableLambdaServiceV1', () => {
    let lambda;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let config = pip_services3_commons_nodex_1.ConfigParams.fromTuples('logger.descriptor', 'pip-services:logger:console:default:1.0', 'persistence.descriptor', 'pip-service-data:persistence:memory:default:1.0', 'controller.descriptor', 'pip-service-data:controller:default:default:1.0', 'service.descriptor', 'pip-service-data:service:commandable-lambda:default:1.0');
        lambda = new EntitiesLambdaFunction_1.EntitiesLambdaFunction();
        lambda.configure(config);
        yield lambda.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield lambda.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create one entity
        let entity = yield lambda.act({
            cmd: 'v1.entities.create_entity',
            entity: ENTITY1
        });
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);
        let entity1 = entity;
        // Create another entity
        entity = yield lambda.act({
            cmd: 'v1.entities.create_entity',
            entity: ENTITY2
        });
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);
        // Get all entities
        let page = yield lambda.act({
            cmd: 'v1.entities.get_entities',
            filter: {}
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        // Update the entity
        entity1.name = 'Updated Entity 1';
        entity = yield lambda.act({
            cmd: 'v1.entities.update_entity',
            entity: entity1
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('Updated Entity 1', entity.name);
        // Delete account
        entity = yield lambda.act({
            cmd: 'v1.entities.delete_entity_by_id',
            entity_id: entity1.id,
        });
        // Try to get delete entity
        entity = yield lambda.act({
            cmd: 'v1.entities.get_entity_by_id',
            entity_id: entity1.id,
        });
        assert.isNull(entity || null);
    }));
});
//# sourceMappingURL=EntitiesCommandableLambdaServiceV1.test.js.map