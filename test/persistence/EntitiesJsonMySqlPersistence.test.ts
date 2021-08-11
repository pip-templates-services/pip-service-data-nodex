const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';
import { EntitiesJsonMySqlPersistence } from '../../src/persistence/EntitiesJsonMySqlPersistence';

suite('EntitiesJsonMySqlPersistence', ()=> {
    let persistence: EntitiesJsonMySqlPersistence;
    let fixture: EntitiesPersistenceFixture;

    let mysqlUri = process.env['MYSQL_URI'];
    let mysqlHost = process.env['MYSQL_HOST'] || 'localhost';
    let mysqlPort = process.env['MYSQL_PORT'] || 3306;
    let mysqlDatabase = process.env['MYSQL_DB'] || 'test';
    let mysqlUser = process.env['MYSQL_USER'] || 'user';
    let mysqlPassword = process.env['MYSQL_PASSWORD'] || 'password';

    if (mysqlUri == null && mysqlHost == null)
        return;

    setup(async () => {
        let dbConfig = ConfigParams.fromTuples(
            'connection.uri', mysqlUri,
            'connection.host', mysqlHost,
            'connection.port', mysqlPort,
            'connection.database', mysqlDatabase,
            'credential.username', mysqlUser,
            'credential.password', mysqlPassword
        );
        persistence = new EntitiesJsonMySqlPersistence();
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