const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntitiesSqlServerPersistence } from '../../src/persistence/EntitiesSqlServerPersistence';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';

suite('EntitiesSqlServerPersistence', () => {
    let persistence: EntitiesSqlServerPersistence;
    let fixture: EntitiesPersistenceFixture;

    let sqlserverUri = process.env['SQLSERVER_URI'];
    let sqlserverHost = process.env['SQLSERVER_HOST']; // || 'localhost';
    let sqlserverPort = process.env['SQLSERVER_PORT'] || 1433;
    let sqlserverDatabase = process.env['SQLSERVER_DB'] || 'master';
    let sqlserverUser = process.env['SQLSERVER_USER'] || 'sa';
    let sqlserverPassword = process.env['SQLSERVER_PASSWORD'] || 'sqlserver_123';

    // Exit if postgres connection is not set
    if (sqlserverUri == null && sqlserverHost == null)
        return;

    setup(async () => {
        persistence = new EntitiesSqlServerPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'connection.uri', sqlserverUri,
            'connection.host', sqlserverHost,
            'connection.port', sqlserverPort,
            'connection.database', sqlserverDatabase,
            'credential.username', sqlserverUser,
            'credential.password', sqlserverPassword
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