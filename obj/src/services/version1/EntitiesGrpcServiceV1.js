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
exports.EntitiesGrpcServiceV1 = void 0;
/** @module services */
/** @hidden */
let services = require('../../../../src/protos/entities_v1_grpc_pb');
/** @hidden */
let messages = require('../../../../src/protos/entities_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const EntitiesGrpcConverterV1_1 = require("./EntitiesGrpcConverterV1");
class EntitiesGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.EntitiesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("pip-service-data", "controller", "*", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getEntities(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.EntitiesPageReply();
            let timing = this.instrument(correlationId, "get_entities");
            try {
                let result = yield this._controller.getEntities(correlationId, filter, paging);
                let page = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromEntitiesPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromError(err);
                response.setError(error);
                timing.endFailure(err);
            }
            finally {
                timing.endSuccess();
            }
            return response;
        });
    }
    getEntityById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let id = call.request.getEntityId();
            let response = new messages.EntityReply();
            let timing = this.instrument(correlationId, "get_entity_by_id");
            try {
                let result = yield this._controller.getEntityById(correlationId, id);
                let entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromEntity(result);
                response.setEntity(entity);
            }
            catch (err) {
                let error = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromError(err);
                response.setError(error);
                timing.endFailure(err);
            }
            finally {
                timing.endSuccess();
            }
            return response;
        });
    }
    getEntityByName(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let name = call.request.getName();
            let response = new messages.EntityReply();
            let timing = this.instrument(correlationId, "get_entity_by_name");
            try {
                let result = yield this._controller.getEntityByName(correlationId, name);
                let entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromEntity(result);
                response.setEntity(entity);
            }
            catch (err) {
                let error = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromError(err);
                response.setError(error);
                timing.endFailure(err);
            }
            finally {
                timing.endSuccess();
            }
            return response;
        });
    }
    createEntity(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let entity = call.request.getEntity();
            entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.toEntity(entity);
            let response = new messages.EntityReply();
            let timing = this.instrument(correlationId, "create_entity");
            try {
                let result = yield this._controller.createEntity(correlationId, entity);
                entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromEntity(result);
                response.setEntity(entity);
            }
            catch (err) {
                let error = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromError(err);
                response.setError(error);
                timing.endFailure(err);
            }
            finally {
                timing.endSuccess();
            }
            return response;
        });
    }
    updateEntity(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let entity = call.request.getEntity();
            entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.toEntity(entity);
            let response = new messages.EntityReply();
            let timing = this.instrument(correlationId, "update_entity");
            try {
                let result = yield this._controller.updateEntity(correlationId, entity);
                entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromEntity(result);
                response.setEntity(entity);
            }
            catch (err) {
                let error = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromError(err);
                response.setError(error);
                timing.endFailure(err);
            }
            finally {
                timing.endSuccess();
            }
            return response;
        });
    }
    deleteEntityById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let id = call.request.getEntityId();
            ;
            let response = new messages.EntityReply();
            let timing = this.instrument(correlationId, "delete_entity_by_id");
            try {
                let result = yield this._controller.deleteEntityById(correlationId, id);
                let entity = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromEntity(result);
                response.setEntity(entity);
            }
            catch (err) {
                let error = EntitiesGrpcConverterV1_1.EntitiesGrpcConverterV1.fromError(err);
                response.setError(error);
                timing.endFailure(err);
            }
            finally {
                timing.endSuccess();
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_entities', null, this.getEntities);
        this.registerMethod('get_entity_by_id', null, this.getEntityById);
        this.registerMethod('get_entity_by_name', null, this.getEntityByName);
        this.registerMethod('create_entity', null, this.createEntity);
        this.registerMethod('update_entity', null, this.updateEntity);
        this.registerMethod('delete_entity_by_id', null, this.deleteEntityById);
    }
}
exports.EntitiesGrpcServiceV1 = EntitiesGrpcServiceV1;
//# sourceMappingURL=EntitiesGrpcServiceV1.js.map