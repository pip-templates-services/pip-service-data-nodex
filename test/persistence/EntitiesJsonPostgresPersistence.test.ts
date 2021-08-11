const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntitiesJsonPostgresPersistence } from '../../src/persistence/EntitiesJsonPostgresPersistence';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';

suite('EntitiesJsonPostgresPersistence', () => {
    let persistence: EntitiesJsonPostgresPersistence;
    let fixture: EntitiesPersistenceFixture;

    let postgresUri = process.env['POSTGRES_SERVICE_URI'];
    let postgresHost = process.env['POSTGRES_SERVICE_HOST'] || 'localhost';
    let postgresPort = process.env['POSTGRES_SERVICE_PORT'] || 5432;
    let postgresDatabase = process.env['POSTGRES_SERVICE_DB'] || 'test';
    let postgresUser = process.env['POSTGRES_USER'] || 'postgres';
    let postgresPassword = process.env['POSTGRES_PASS'] || 'postgres';

    // Exit if postgres connection is not set
    if (postgresUri == null && postgresHost == null)
        return;

    setup(async () => {
        persistence = new EntitiesJsonPostgresPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'connection.uri', postgresUri,
            'connection.host', postgresHost,
            'connection.port', postgresPort,
            'connection.database', postgresDatabase,
            'credential.username', postgresUser,
            'credential.password', postgresPassword
        ));

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