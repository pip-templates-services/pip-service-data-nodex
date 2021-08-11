"use strict";
/** @module services */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class EntitiesCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1.entities');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('entities', 'controller', '*', '*', '1.0'));
    }
}
exports.EntitiesCommandableGrpcServiceV1 = EntitiesCommandableGrpcServiceV1;
//# sourceMappingURL=EntitiesCommandableGrpcServiceV1.js.map