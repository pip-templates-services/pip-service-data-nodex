const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntitiesMongoDbPersistence } from '../../src/persistence/EntitiesMongoDbPersistence';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';

suite('EntitiesMongoDbPersistence', () => {
    let persistence: EntitiesMongoDbPersistence;
    let fixture: EntitiesPersistenceFixture;

    setup(async () => {
        let mongoUri = process.env['MONGO_SERVICE_URI'];
        let mongoHost = process.env['MONGO_SERVICE_HOST'] || 'localhost';
        let mongoPort = process.env['MONGO_SERVICE_PORT'] || 27017;
        let mongoDatabase = process.env['MONGO_SERVICE_DB'] || 'test';
        // Exit if mongo connection is not set
        if (mongoUri == null && mongoHost == null)
            return;

        let dbConfig = ConfigParams.fromTuples(
            'connection.uri', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase
        );

        persistence = new EntitiesMongoDbPersistence();
        persistence.configure(dbConfig);

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
