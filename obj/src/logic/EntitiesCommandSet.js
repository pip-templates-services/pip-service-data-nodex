"use strict";
/** @module logic */
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
exports.EntitiesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const EntityV1Schema_1 = require("../data/version1/EntityV1Schema");
class EntitiesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeGetEntitiesCommand());
        this.addCommand(this.makeGetEntityByIdCommand());
        this.addCommand(this.makeGetEntityByNameCommand());
        this.addCommand(this.makeCreateEntityCommand());
        this.addCommand(this.makeUpdateEntityCommand());
        this.addCommand(this.makeDeleteEntityByIdCommand());
    }
    makeGetEntitiesCommand() {
        return new pip_services3_commons_nodex_4.Command('get_entities', new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_6.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_7.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_2.FilterParams.fromValue(args.get('filter'));
            let paging = pip_services3_commons_nodex_3.PagingParams.fromValue(args.get('paging'));
            return yield this._controller.getEntities(correlationId, filter, paging);
        }));
    }
    makeGetEntityByIdCommand() {
        return new pip_services3_commons_nodex_4.Command('get_entity_by_id', new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('entity_id', pip_services3_commons_nodex_8.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let entityId = args.getAsString('entity_id');
            return yield this._controller.getEntityById(correlationId, entityId);
        }));
    }
    makeGetEntityByNameCommand() {
        return new pip_services3_commons_nodex_4.Command('get_entity_by_name', new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('name', pip_services3_commons_nodex_8.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let name = args.getAsString('name');
            return yield this._controller.getEntityByName(correlationId, name);
        }));
    }
    makeCreateEntityCommand() {
        return new pip_services3_commons_nodex_4.Command('create_entity', new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('entity', new EntityV1Schema_1.EntityV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let entity = args.getAsObject('entity');
            return yield this._controller.createEntity(correlationId, entity);
        }));
    }
    makeUpdateEntityCommand() {
        return new pip_services3_commons_nodex_4.Command('update_entity', new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('entity', new EntityV1Schema_1.EntityV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let entity = args.getAsObject('entity');
            return yield this._controller.updateEntity(correlationId, entity);
        }));
    }
    makeDeleteEntityByIdCommand() {
        return new pip_services3_commons_nodex_4.Command('delete_entity_by_id', new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('entity_id', pip_services3_commons_nodex_8.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let entityId = args.getAsString('entity_id');
            return yield this._controller.deleteEntityById(correlationId, entityId);
        }));
    }
}
exports.EntitiesCommandSet = EntitiesCommandSet;
//# sourceMappingURL=EntitiesCommandSet.js.map