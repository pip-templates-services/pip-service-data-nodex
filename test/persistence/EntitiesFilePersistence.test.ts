import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntitiesFilePersistence } from '../../src/persistence/EntitiesFilePersistence';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';

suite('EntitiesFilePersistence', () => {
    let persistence: EntitiesFilePersistence;
    let fixture: EntitiesPersistenceFixture;

    setup(async () => {
        persistence = new EntitiesFilePersistence('data/entities.test.json');
        persistence.configure(new ConfigParams());

        fixture = new EntitiesPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
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