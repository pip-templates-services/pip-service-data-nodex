import { IEntitiesPersistence } from '../../src/persistence/IEntitiesPersistence';
export declare class EntitiesPersistenceFixture {
    private _persistence;
    constructor(persistence: IEntitiesPersistence);
    private testCreateEntities;
    testCrudOperations(): Promise<void>;
    testGetWithFilters(): Promise<void>;
}
