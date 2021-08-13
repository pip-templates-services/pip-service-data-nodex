"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesServiceFactory = void 0;
/** @module build */
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const EntitiesMemoryPersistence_1 = require("../persistence/EntitiesMemoryPersistence");
const EntitiesFilePersistence_1 = require("../persistence/EntitiesFilePersistence");
const EntitiesMongoDbPersistence_1 = require("../persistence/EntitiesMongoDbPersistence");
const EntitiesCouchbasePersistence_1 = require("../persistence/EntitiesCouchbasePersistence");
const EntitiesPostgresPersistence_1 = require("../persistence/EntitiesPostgresPersistence");
const EntitiesJsonPostgresPersistence_1 = require("../persistence/EntitiesJsonPostgresPersistence");
const EntitiesMySqlPersistence_1 = require("../persistence/EntitiesMySqlPersistence");
const EntitiesJsonMySqlPersistence_1 = require("../persistence/EntitiesJsonMySqlPersistence");
const EntitiesSqlServerPersistence_1 = require("../persistence/EntitiesSqlServerPersistence");
const EntitiesJsonSqlServerPersistence_1 = require("../persistence/EntitiesJsonSqlServerPersistence");
const EntitiesController_1 = require("../logic/EntitiesController");
const EntitiesCommandableHttpServiceV1_1 = require("../services/version1/EntitiesCommandableHttpServiceV1");
const EntitiesCommandableGrpcServiceV1_1 = require("../services/version1/EntitiesCommandableGrpcServiceV1");
const EntitiesCommandableLambdaServiceV1_1 = require("../services/version1/EntitiesCommandableLambdaServiceV1");
const EntitiesGrpcServiceV1_1 = require("../services/version1/EntitiesGrpcServiceV1");
const EntitiesRestServiceV1_1 = require("../services/version1/EntitiesRestServiceV1");
const EntitiesLambdaServiceV1_1 = require("../services/version1/EntitiesLambdaServiceV1");
class EntitiesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(EntitiesServiceFactory.MemoryPersistenceDescriptor, EntitiesMemoryPersistence_1.EntitiesMemoryPersistence);
        this.registerAsType(EntitiesServiceFactory.FilePersistenceDescriptor, EntitiesFilePersistence_1.EntitiesFilePersistence);
        this.registerAsType(EntitiesServiceFactory.MongoDbPersistenceDescriptor, EntitiesMongoDbPersistence_1.EntitiesMongoDbPersistence);
        this.registerAsType(EntitiesServiceFactory.CouchbasePersistenceDescriptor, EntitiesCouchbasePersistence_1.EntitiesCouchbasePersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesPostgresPersistence, EntitiesPostgresPersistence_1.EntitiesPostgresPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonPostgresPersistence, EntitiesJsonPostgresPersistence_1.EntitiesJsonPostgresPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesMySqlPersistence, EntitiesMySqlPersistence_1.EntitiesMySqlPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonMySqlPersistence, EntitiesJsonMySqlPersistence_1.EntitiesJsonMySqlPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesSqlServerPersistence, EntitiesSqlServerPersistence_1.EntitiesSqlServerPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonSqlServerPersistence, EntitiesJsonSqlServerPersistence_1.EntitiesJsonSqlServerPersistence);
        this.registerAsType(EntitiesServiceFactory.ControllerDescriptor, EntitiesController_1.EntitiesController);
        this.registerAsType(EntitiesServiceFactory.CommandableHttpServiceV1Descriptor, EntitiesCommandableHttpServiceV1_1.EntitiesCommandableHttpServiceV1);
        this.registerAsType(EntitiesServiceFactory.CommandableGrpcServiceV1Descriptor, EntitiesCommandableGrpcServiceV1_1.EntitiesCommandableGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.CommandableLambdaServiceV1Descriptor, EntitiesCommandableLambdaServiceV1_1.EntitiesCommandableLambdaServiceV1);
        this.registerAsType(EntitiesServiceFactory.GrpcServiceV1Descriptor, EntitiesGrpcServiceV1_1.EntitiesGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.RestServiceV1Descriptor, EntitiesRestServiceV1_1.EntitiesRestServiceV1);
        this.registerAsType(EntitiesServiceFactory.LambdaServiceV1Descriptor, EntitiesLambdaServiceV1_1.EntitiesLambdaServiceV1);
    }
}
exports.EntitiesServiceFactory = EntitiesServiceFactory;
EntitiesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'memory', '*', '1.0');
EntitiesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'file', '*', '1.0');
EntitiesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'mongodb', '*', '1.0');
EntitiesServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'couchbase', '*', '1.0');
EntitiesServiceFactory.EntitiesPostgresPersistence = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'postgres', '*', '1.0');
EntitiesServiceFactory.EntitiesJsonPostgresPersistence = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'json-postgres', '*', '1.0');
EntitiesServiceFactory.EntitiesMySqlPersistence = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'mysql', '*', '1.0');
EntitiesServiceFactory.EntitiesJsonMySqlPersistence = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'json-mysql', '*', '1.0');
EntitiesServiceFactory.EntitiesSqlServerPersistence = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'sqlserver', '*', '1.0');
EntitiesServiceFactory.EntitiesJsonSqlServerPersistence = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'persistence', 'json-sqlserver', '*', '1.0');
EntitiesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'controller', 'default', '*', '1.0');
EntitiesServiceFactory.CommandableHttpServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'service', 'commandable-http', '*', '1.0');
EntitiesServiceFactory.CommandableGrpcServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'service', 'commandable-grpc', '*', '1.0');
EntitiesServiceFactory.CommandableLambdaServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'service', 'commandable-lambda', '*', '1.0');
EntitiesServiceFactory.GrpcServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'service', 'grpc', '*', '1.0');
EntitiesServiceFactory.RestServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'service', 'rest', '*', '1.0');
EntitiesServiceFactory.LambdaServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('pip-service-data', 'service', 'lambda', '*', '1.0');
//# sourceMappingURL=EntitiesServiceFactory.js.map