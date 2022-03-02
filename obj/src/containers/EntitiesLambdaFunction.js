"use strict";
/** @module container */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.EntitiesLambdaFunction = void 0;
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const pip_services3_prometheus_nodex_1 = require("pip-services3-prometheus-nodex");
const EntitiesServiceFactory_1 = require("../build/EntitiesServiceFactory");
class EntitiesLambdaFunction extends pip_services3_aws_nodex_1.LambdaFunction {
    constructor() {
        super("pip-service-data", "Entities data microservice");
        this._factories.add(new EntitiesServiceFactory_1.EntitiesServiceFactory());
        this._factories.add(new pip_services3_prometheus_nodex_1.DefaultPrometheusFactory());
    }
}
exports.EntitiesLambdaFunction = EntitiesLambdaFunction;
exports.handler = new EntitiesLambdaFunction().getHandler();
//# sourceMappingURL=EntitiesLambdaFunction.js.map