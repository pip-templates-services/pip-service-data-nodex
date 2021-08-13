"use strict";
/** @module services */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesCommandableHttpServiceV1 = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class EntitiesCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/entities');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'controller', '*', '*', '1.0'));
    }
}
exports.EntitiesCommandableHttpServiceV1 = EntitiesCommandableHttpServiceV1;
//# sourceMappingURL=EntitiesCommandableHttpServiceV1.js.map