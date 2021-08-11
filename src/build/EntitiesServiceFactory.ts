/** @module build */
import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { EntitiesMemoryPersistence } from '../persistence/EntitiesMemoryPersistence';
import { EntitiesFilePersistence } from '../persistence/EntitiesFilePersistence';
import { EntitiesMongoDbPersistence } from '../persistence/EntitiesMongoDbPersistence';
import { EntitiesCouchbasePersistence } from '../persistence/EntitiesCouchbasePersistence';
import { EntitiesPostgresPersistence } from '../persistence/EntitiesPostgresPersistence';
import { EntitiesJsonPostgresPersistence } from '../persistence/EntitiesJsonPostgresPersistence';
import { EntitiesMySqlPersistence } from '../persistence/EntitiesMySqlPersistence';
import { EntitiesJsonMySqlPersistence } from '../persistence/EntitiesJsonMySqlPersistence';
import { EntitiesSqlServerPersistence } from '../persistence/EntitiesSqlServerPersistence';
import { EntitiesJsonSqlServerPersistence } from '../persistence/EntitiesJsonSqlServerPersistence';
import { EntitiesController } from '../logic/EntitiesController';
import { EntitiesCommandableHttpServiceV1 } from '../services/version1/EntitiesCommandableHttpServiceV1';
import { EntitiesCommandableGrpcServiceV1 } from '../services/version1/EntitiesCommandableGrpcServiceV1';
import { EntitiesGrpcServiceV1 } from '../services/version1/EntitiesGrpcServiceV1';
import { EntitiesRestServiceV1 } from '../services/version1/EntitiesRestServiceV1';


export class EntitiesServiceFactory extends Factory{
    public static MemoryPersistenceDescriptor = new Descriptor('entities', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('entities', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('entities', 'persistence', 'mongodb', '*', '1.0');
    public static CouchbasePersistenceDescriptor = new Descriptor('entities', 'persistence', 'couchbase', '*', '1.0');
    public static EntitiesPostgresPersistence = new Descriptor('entities', 'persistence', 'postgres', '*', '1.0');
    public static EntitiesJsonPostgresPersistence = new Descriptor('entities', 'persistence', 'json-postgres', '*', '1.0');
    public static EntitiesMySqlPersistence = new Descriptor('entities', 'persistence', 'mysql', '*', '1.0');
    public static EntitiesJsonMySqlPersistence = new Descriptor('entities', 'persistence', 'json-mysql', '*', '1.0');
    public static EntitiesSqlServerPersistence = new Descriptor('entities', 'persistence', 'sqlserver', '*', '1.0');
    public static EntitiesJsonSqlServerPersistence = new Descriptor('entities', 'persistence', 'json-sqlserver', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('entities', 'controller', 'default', '*', '1.0');
    public static CommandableHttpServiceV1Descriptor = new Descriptor('entities', 'service', 'commandable-http', '*', '1.0');
    public static CommandableGrpcServiceV1Descriptor = new Descriptor('entities', 'service', 'commandable-grpc', '*', '1.0');
    public static GrpcServiceV1Descriptor = new Descriptor('entities', 'service', 'grpc', '*', '1.0');
    public static RestServiceDescriptor = new Descriptor('entities', 'service', 'rest', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(EntitiesServiceFactory.MemoryPersistenceDescriptor, EntitiesMemoryPersistence);
        this.registerAsType(EntitiesServiceFactory.FilePersistenceDescriptor, EntitiesFilePersistence);
        this.registerAsType(EntitiesServiceFactory.MongoDbPersistenceDescriptor, EntitiesMongoDbPersistence);
        this.registerAsType(EntitiesServiceFactory.CouchbasePersistenceDescriptor, EntitiesCouchbasePersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesPostgresPersistence, EntitiesPostgresPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonPostgresPersistence, EntitiesJsonPostgresPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesMySqlPersistence, EntitiesMySqlPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonMySqlPersistence, EntitiesJsonMySqlPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesSqlServerPersistence, EntitiesSqlServerPersistence);
        this.registerAsType(EntitiesServiceFactory.EntitiesJsonSqlServerPersistence, EntitiesJsonSqlServerPersistence);
        this.registerAsType(EntitiesServiceFactory.ControllerDescriptor, EntitiesController);
        this.registerAsType(EntitiesServiceFactory.CommandableHttpServiceV1Descriptor, EntitiesCommandableHttpServiceV1);
        this.registerAsType(EntitiesServiceFactory.CommandableGrpcServiceV1Descriptor, EntitiesCommandableGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.GrpcServiceV1Descriptor, EntitiesGrpcServiceV1);
        this.registerAsType(EntitiesServiceFactory.RestServiceDescriptor, EntitiesRestServiceV1);
    }
}