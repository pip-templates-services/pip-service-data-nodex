/** @module build */
import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class EntitiesServiceFactory extends Factory {
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static CouchbasePersistenceDescriptor: Descriptor;
    static EntitiesPostgresPersistence: Descriptor;
    static EntitiesJsonPostgresPersistence: Descriptor;
    static EntitiesMySqlPersistence: Descriptor;
    static EntitiesJsonMySqlPersistence: Descriptor;
    static EntitiesSqlServerPersistence: Descriptor;
    static EntitiesJsonSqlServerPersistence: Descriptor;
    static ControllerDescriptor: Descriptor;
    static CommandableHttpServiceV1Descriptor: Descriptor;
    static CommandableGrpcServiceV1Descriptor: Descriptor;
    static CommandableLambdaServiceV1Descriptor: Descriptor;
    static GrpcServiceV1Descriptor: Descriptor;
    static RestServiceV1Descriptor: Descriptor;
    static LambdaServiceV1Descriptor: Descriptor;
    constructor();
}
