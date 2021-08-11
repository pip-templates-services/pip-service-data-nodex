"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesProcess = void 0;
/** @module container */
const pip_services3_datadog_nodex_1 = require("pip-services3-datadog-nodex");
const pip_services3_elasticsearch_nodex_1 = require("pip-services3-elasticsearch-nodex");
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_prometheus_nodex_1 = require("pip-services3-prometheus-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const EntitiesServiceFactory_1 = require("../build/EntitiesServiceFactory");
class EntitiesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super('entities', 'Entities microservice');
        this._factories.add(new EntitiesServiceFactory_1.EntitiesServiceFactory());
        this._factories.add(new pip_services3_elasticsearch_nodex_1.DefaultElasticSearchFactory());
        this._factories.add(new pip_services3_prometheus_nodex_1.DefaultPrometheusFactory());
        this._factories.add(new pip_services3_datadog_nodex_1.DefaultDataDogFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory());
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory());
    }
}
exports.EntitiesProcess = EntitiesProcess;
//# sourceMappingURL=EntitiesProcess.js.map