"use strict";
/** @module container */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.EntitiesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const EntitiesServiceFactory_1 = require("../build/EntitiesServiceFactory");
class EntitiesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("entities", "Entities microservice");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('entities', 'controller', 'default', '*', '*'));
        this._factories.add(new EntitiesServiceFactory_1.EntitiesServiceFactory());
    }
}
exports.EntitiesLambdaFunction = EntitiesLambdaFunction;
exports.handler = new EntitiesLambdaFunction().getHandler();
//# sourceMappingURL=EntitiesLambdaFunction.js.map