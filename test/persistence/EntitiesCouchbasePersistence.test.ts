const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { EntitiesCouchbasePersistence } from '../../src/persistence/EntitiesCouchbasePersistence';
import { EntitiesPersistenceFixture } from './EntitiesPersistenceFixture';

suite('EntitiesCouchbasePersistence', ()=> {
    let persistence: EntitiesCouchbasePersistence;
    let fixture: EntitiesPersistenceFixture;

    let couchbaseUri = process.env['COUCHBASE_SERVICE_URI'];
    let couchbaseHost = process.env['COUCHBASE_SERVICE_HOST']; // || 'localhost';
    let couchbasePort = process.env['COUCHBASE_SERVICE_PORT'] || 8091;
    let couchbaseUser = process.env['COUCHBASE_USER'] || 'Administrator';
    let couchbasePass = process.env['COUCHBASE_PASS'] || 'password';
    let couchbaseBucket = process.env['COUCHBASE_BUCKET'] || 'test';
    let couchbaseCollection = process.env['COUCHBASE_COLLECTION'] || 'entities';

    // Exit if couchbase connection is not set
    if (couchbaseUri == null && couchbaseHost == null)
        return;

    setup(async () => {
        let dbConfig = ConfigParams.fromTuples(
            'bucket', couchbaseBucket,
            'collection', couchbaseCollection,
            'options.auto_create', true,
            'connection.uri', couchbaseUri,
            'connection.host', couchbaseHost,
            'connection.port', couchbasePort,
            'connection.detailed_errcodes', 1,
            'credential.username', couchbaseUser,
            'credential.password', couchbasePass
        );

        persistence = new EntitiesCouchbasePersistence();
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