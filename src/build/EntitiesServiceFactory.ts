/** @module build */
import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { EntitiesMemoryPersistence } from '../persistence/EntitiesMemoryPersistence';
import { EntitiesFilePersistence } from '../persistence/EntitiesFilePersistence';
import { EntitiesMongoDbPersistence } from '../persistence/EntitiesMongoDbPersistence';
// import { EntitiesCouchbasePersistence } from '../persistence/EntitiesCouchbasePersistence';
import { EntitiesPostgresPersistence } from '../persistence/EntitiesPostgresPersistence';
import { EntitiesJsonPostgresPersistence } from '../persistence/EntitiesJsonPostgresPersistence';
import { EntitiesMySqlPersistence } from '../persistence/EntitiesMySqlPersistence';
import { EntitiesJsonMySqlPersistence } from '../persistence/EntitiesJsonMySqlPersistence';
import { EntitiesSqlServerPersistence } from '../persistence/EntitiesSqlServerPersistence';
import { EntitiesJsonSqlServerPersistence } from '../persistence/EntitiesJsonSqlServerPersistence';
import { EntitiesController } from '../logic/EntitiesController';
import { EntitiesCommandableHttpServiceV1 } from '../services/version1/EntitiesCommandableHttpServiceV1';
import { EntitiesCommandableGrpcServiceV1 } from '../services/version1/EntitiesCommandableGrpcServiceV1';
import { EntitiesCommandableLambdaServiceV1 } from '../services/version1/EntitiesCommandableLambdaServiceV1';
import { EntitiesGrpcServiceV1 } from '../services/version1/EntitiesGrpcServiceV1';
import { EntitiesRestServiceV1 } from '../services/version1/EntitiesRestServiceV1';
import { EntitiesLambdaServiceV1 } from '../services/version1/EntitiesLambdaServiceV1';

export class EntitiesServiceFactory extends Factory{
    private static MemoryPersistenceDescriptor = new Descriptor('pip-service-data', 'persistence', 'memory', '*', '1.0');
    private static FilePersistenceDescriptor = new Descriptor('pip-service-data', 'persistence', 'file', '*', '1.0');
    private static MongoDbPersistenceDescriptor = new Descriptor('pip-service-data', 'persistence', 'mongodb', '*', '1.0');
    // private static CouchbasePersistenceDescriptor = new Descriptor('pip-service-data', 'persistence', 'couchbase', '*', '1.0');
    private static EntitiesPostgresPersistence = new Descriptor('pip-service-data', 'persistence', 'postgres', '*', '1.0');
    private static EntitiesJsonPostgresPersistence = new Descriptor('pip-service-data', 'persistence', 'json-postgres', '*', '1.0');
    private static EntitiesMySqlPersistence = new Descriptor('pip-service-data', 'persistence', 'mysql', '*', '1.0');
    private static EntitiesJsonMySqlPersistence = new Descriptor('pip-service-data', 'persistence', 'json-mysql', '*', '1.0');
    private static EntitiesSqlServerPersistence = new Descriptor('pip-service-data', 'persistence', 'sqlserver', '*', '1.0');
    private static EntitiesJsonSqlServerPersistence = new Descriptor('pip-service-data', 'persistence', 'json-sqlserver', '*', '1.0');
    private static ControllerDescriptor = new Descriptor('pip-service-data', 'controller', 'default', '*', '1.0');
    private static CommandableHttpServiceV1Descriptor = new Descriptor('pip-service-data', 'service', 'commandable-http', '*', '1.0');
    private static CommandableGrpcServiceV1Descriptor = new Descriptor('pip-service-data', 'service', 'commandable-grpc', '*', '1.0');
    private static CommandableLambdaServiceV1Descriptor = new Descriptor('pip-service-data', 'service', 'commandable-lambda', '*', '1.0');
    private static GrpcServiceV1Descriptor = new Descriptor('pip-service-data', 'service', 'grpc', '*', '1.0');
    private static RestServiceV1Descriptor = new Descriptor('pip-service-data', 'service', 'rest', '*', '1.0');
    private static LambdaServiceV1Descriptor = new Descriptor('pip-service-data', 'service', 'lambda', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(EntitiesServiceFactory.MemoryPersistenceDescriptor, EntitiesMemoryPersistence);
        this.registerAsType(EntitiesServiceFactory.FilePersistenceDescriptor, EntitiesFilePersistence);
        this.registerAsType(EntitiesServiceFactory.MongoDbPersistenceDescriptor, EntitiesMongoDbPersistence);
        // this.registerAsType(EntitiesServiceFactory.CouchbasePersistenceDescriptor, EntitiesCouchbasePersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesPostgresPersistence, EntitiesPostgresPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonPostgresPersistence, EntitiesJsonPostgresPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesMySqlPersistence, EntitiesMySqlPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonMySqlPersistence, EntitiesJsonMySqlPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesSqlServerPersistence, EntitiesSqlServerPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonSqlServerPersistence, EntitiesJsonSqlServerPersistence);
        this.registerAsType(EntitiesServiceFactory.ControllerDescriptor, EntitiesController);
        this.registerAsType(EntitiesServiceFactory.CommandableHttpServiceV1Descriptor, EntitiesCommandableHttpServiceV1);
        this.registerAsType(EntitiesServiceFactory.CommandableGrpcServiceV1Descriptor, EntitiesCommandableGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.CommandableLambdaServiceV1Descriptor, EntitiesCommandableLambdaServiceV1);
        this.registerAsType(EntitiesServiceFactory.GrpcServiceV1Descriptor, EntitiesGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.RestServiceV1Descriptor, EntitiesRestServiceV1);
        this.registerAsType(EntitiesServiceFactory.LambdaServiceV1Descriptor, EntitiesLambdaServiceV1);
    }
}