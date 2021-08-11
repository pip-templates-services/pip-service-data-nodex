"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const EntityTypeV1_1 = require("../data/version1/EntityTypeV1");
const EntitiesCommandSet_1 = require("./EntitiesCommandSet");
class EntitiesController {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', '*', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new EntitiesCommandSet_1.EntitiesCommandSet(this);
        }
        return this._commandSet;
    }
    getEntities(correlationId, filter, paging) {
        return this._persistence.getPageByFilter(correlationId, filter, paging);
    }
    getEntityById(correlationId, entityId) {
        return this._persistence.getOneById(correlationId, entityId);
    }
    getEntityByName(correlationId, entityId) {
        return this._persistence.getOneByName(correlationId, entityId);
    }
    createEntity(correlationId, entity) {
        entity.id = entity.id || pip_services3_commons_nodex_2.IdGenerator.nextLong();
        entity.type = entity.type || EntityTypeV1_1.EntityTypeV1.Unknown;
        return this._persistence.create(correlationId, entity);
    }
    updateEntity(correlationId, entity) {
        entity.type = entity.type || EntityTypeV1_1.EntityTypeV1.Unknown;
        return this._persistence.update(correlationId, entity);
    }
    deleteEntityById(correlationId, entityId) {
        return this._persistence.deleteById(correlationId, entityId);
    }
}
exports.EntitiesController = EntitiesController;
//# sourceMappingURL=EntitiesController.js.map