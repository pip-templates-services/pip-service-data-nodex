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
exports.EntitiesRestServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class EntitiesRestServiceV1 extends pip_services3_rpc_nodex_1.RestService {
    constructor() {
        super();
        this._baseRoute = "v1/entities";
        this._dependencyResolver.put("controller", new pip_services3_commons_nodex_1.Descriptor("pip-service-data", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired("controller");
    }
    getEntities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = this.getCorrelationId(req);
            let filter = req.param('filter');
            let paging = req.param('paging');
            try {
                let result = yield this._controller.getEntities(correlationId, filter, paging);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getEntityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = this.getCorrelationId(req);
            let id = req.route.params.id;
            try {
                let result = yield this._controller.getEntityById(correlationId, id);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getEntityByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = this.getCorrelationId(req);
            let name = req.route.params.name;
            try {
                let result = yield this._controller.getEntityByName(correlationId, name);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    createEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = this.getCorrelationId(req);
            let data = req.body;
            try {
                let result = yield this._controller.createEntity(correlationId, data);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    updateEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = this.getCorrelationId(req);
            let data = req.body;
            try {
                let result = yield this._controller.updateEntity(correlationId, data);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    deleteEntityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = this.getCorrelationId(req);
            let id = req.route.params.id;
            try {
                let result = yield this._controller.deleteEntityById(correlationId, id);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    register() {
        this.registerRoute('get', '/entities', null, this.getEntities);
        this.registerRoute('get', '/entities/:id', null, this.getEntityById);
        this.registerRoute('get', '/entities/name/:name', null, this.getEntityByName);
        this.registerRoute('post', '/entities', null, this.createEntity);
        this.registerRoute('put', '/entities', null, this.updateEntity);
        this.registerRoute('del', '/entities/:id', null, this.deleteEntityById);
        this.registerOpenApiSpecFromFile("./src/swagger/entities_v1.yaml");
    }
}
exports.EntitiesRestServiceV1 = EntitiesRestServiceV1;
//# sourceMappingURL=EntitiesRestServiceV1.js.map