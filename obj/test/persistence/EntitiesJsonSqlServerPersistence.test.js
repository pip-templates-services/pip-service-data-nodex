"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = require('process');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const EntitiesJsonSqlServerPersistence_1 = require("../../src/persistence/EntitiesJsonSqlServerPersistence");
const EntitiesPersistenceFixture_1 = require("./EntitiesPersistenceFixture");
suite('EntitiesJsonSqlServerPersistence', () => {
    let persistence;
    let fixture;
    let sqlserverUri = process.env['SQLSERVER_URI'];
    let sqlserverHost = process.env['SQLSERVER_HOST']; // || 'localhost';
    let sqlserverPort = process.env['SQLSERVER_PORT'] || 1433;
    let sqlserverDatabase = process.env['SQLSERVER_DB'] || 'master';
    let sqlserverUser = process.env['SQLSERVER_USER'] || 'sa';
    let sqlserverPassword = process.env['SQLSERVER_PASSWORD'] || 'sqlserver_123';
    // Exit if postgres connection is not set
    if (sqlserverUri == null && sqlserverHost == null)
        return;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new EntitiesJsonSqlServerPersistence_1.EntitiesJsonSqlServerPersistence();
        persistence.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples('connection.uri', sqlserverUri, 'connection.host', sqlserverHost, 'connection.port', sqlserverPort, 'connection.database', sqlserverDatabase, 'credential.username', sqlserverUser, 'credential.password', sqlserverPassword));
        fixture = new EntitiesPersistenceFixture_1.EntitiesPersistenceFixture(persistence);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetWithFilters();
    }));
});
//# sourceMappingURL=EntitiesJsonSqlServerPersistence.test.js.map