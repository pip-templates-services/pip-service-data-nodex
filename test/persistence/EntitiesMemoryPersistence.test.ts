import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntitiesMemoryPersistence } from '../../src/persistence/EntitiesMemoryPersistence';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';

suite('EntitiesMemoryPersistence', () => {
    let persistence: EntitiesMemoryPersistence;
    let fixture: EntitiesPersistenceFixture;

    setup(async () => {
        persistence = new EntitiesMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new EntitiesPersistenceFixture(persistence);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilters();
    });

});