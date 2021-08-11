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
const EntitiesGrpcServiceV1_1 = require("../services/version1/EntitiesGrpcServiceV1");
const EntitiesRestServiceV1_1 = require("../services/version1/EntitiesRestServiceV1");
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
        this.registerAsType(EntitiesServiceFactory.GrpcServiceV1Descriptor, EntitiesGrpcServiceV1_1.EntitiesGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.RestServiceDescriptor, EntitiesRestServiceV1_1.EntitiesRestServiceV1);
    }
}
exports.EntitiesServiceFactory = EntitiesServiceFactory;
EntitiesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'memory', '*', '1.0');
EntitiesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'file', '*', '1.0');
EntitiesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'mongodb', '*', '1.0');
EntitiesServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'couchbase', '*', '1.0');
EntitiesServiceFactory.EntitiesPostgresPersistence = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'postgres', '*', '1.0');
EntitiesServiceFactory.EntitiesJsonPostgresPersistence = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'json-postgres', '*', '1.0');
EntitiesServiceFactory.EntitiesMySqlPersistence = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'mysql', '*', '1.0');
EntitiesServiceFactory.EntitiesJsonMySqlPersistence = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'json-mysql', '*', '1.0');
EntitiesServiceFactory.EntitiesSqlServerPersistence = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'sqlserver', '*', '1.0');
EntitiesServiceFactory.EntitiesJsonSqlServerPersistence = new pip_services3_commons_nodex_1.Descriptor('entities', 'persistence', 'json-sqlserver', '*', '1.0');
EntitiesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'controller', 'default', '*', '1.0');
EntitiesServiceFactory.CommandableHttpServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'service', 'commandable-http', '*', '1.0');
EntitiesServiceFactory.CommandableGrpcServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'service', 'commandable-grpc', '*', '1.0');
EntitiesServiceFactory.GrpcServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'service', 'grpc', '*', '1.0');
EntitiesServiceFactory.RestServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('entities', 'service', 'rest', '*', '1.0');
//# sourceMappingURL=EntitiesServiceFactory.js.map