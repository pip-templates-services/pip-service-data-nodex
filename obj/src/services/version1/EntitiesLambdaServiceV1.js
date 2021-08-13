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
exports.EntitiesLambdaServiceV1 = void 0;
/** @module services */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const EntityV1Schema_1 = require("../../data/version1/EntityV1Schema");
class EntitiesLambdaServiceV1 extends pip_services3_aws_nodex_1.LambdaService {
    constructor() {
        super("v1.entities");
        this._dependencyResolver.put("controller", new pip_services3_commons_nodex_3.Descriptor("pip-service-data", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired("controller");
    }
    getEntities(params) {
        return this._controller.getEntities(params.correlation_id, new pip_services3_commons_nodex_1.FilterParams(params.filter), new pip_services3_commons_nodex_2.PagingParams(params.paging));
    }
    getEntityById(params) {
        return this._controller.getEntityById(params.correlation_id, params.entity_id);
    }
    getEntityByName(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._controller.getEntityByName(params.correlation_id, params.name);
        });
    }
    createEntity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._controller.createEntity(params.correlation_id, params.entity);
        });
    }
    updateEntity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._controller.updateEntity(params.correlation_id, params.entity);
        });
    }
    deleteEntityById(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._controller.deleteEntityById(params.correlation_id, params.entity_id);
        });
    }
    register() {
        this.registerAction('get_entities', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withOptionalProperty("filter", new pip_services3_commons_nodex_6.FilterParamsSchema())
            .withOptionalProperty("paging", new pip_services3_commons_nodex_7.PagingParamsSchema()), this.getEntities);
        this.registerAction('get_entity_by_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withOptionalProperty("entity_id", pip_services3_commons_nodex_5.TypeCode.String), this.getEntityById);
        this.registerAction('get_entity_by_name', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withOptionalProperty("name", pip_services3_commons_nodex_5.TypeCode.String), this.getEntityByName);
        this.registerAction('create_entity', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("entity", new EntityV1Schema_1.EntityV1Schema()), this.createEntity);
        this.registerAction('update_entity', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("entity", new EntityV1Schema_1.EntityV1Schema()), this.updateEntity);
        this.registerAction('delete_entity_by_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withOptionalProperty("entity_id", pip_services3_commons_nodex_5.TypeCode.String), this.deleteEntityById);
    }
}
exports.EntitiesLambdaServiceV1 = EntitiesLambdaServiceV1;
//# sourceMappingURL=EntitiesLambdaServiceV1.js.map