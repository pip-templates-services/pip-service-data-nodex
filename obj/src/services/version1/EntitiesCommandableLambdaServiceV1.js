"use strict";
/** @module services */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesCommandableLambdaServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class EntitiesCommandableLambdaServiceV1 extends pip_services3_aws_nodex_1.CommandableLambdaService {
    constructor() {
        super('v1.entities');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'controller', '*', '*', '1.0'));
    }
}
exports.EntitiesCommandableLambdaServiceV1 = EntitiesCommandableLambdaServiceV1;
//# sourceMappingURL=EntitiesCommandableLambdaServiceV1.js.map