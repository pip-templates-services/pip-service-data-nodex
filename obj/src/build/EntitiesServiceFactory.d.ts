/** @module build */
import { Factory } from 'pip-services3-components-nodex';
export declare class EntitiesServiceFactory extends Factory {
    private static MemoryPersistenceDescriptor;
    private static FilePersistenceDescriptor;
    private static MongoDbPersistenceDescriptor;
    private static EntitiesPostgresPersistence;
    private static EntitiesJsonPostgresPersistence;
    private static EntitiesMySqlPersistence;
    private static EntitiesJsonMySqlPersistence;
    private static EntitiesSqlServerPersistence;
    private static EntitiesJsonSqlServerPersistence;
    private static ControllerDescriptor;
    private static CommandableHttpServiceV1Descriptor;
    private static CommandableGrpcServiceV1Descriptor;
    private static CommandableLambdaServiceV1Descriptor;
    private static GrpcServiceV1Descriptor;
    private static RestServiceV1Descriptor;
    private static LambdaServiceV1Descriptor;
    constructor();
}
