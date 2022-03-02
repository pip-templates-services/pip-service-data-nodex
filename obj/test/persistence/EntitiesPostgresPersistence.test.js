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
const EntitiesPostgresPersistence_1 = require("../../src/persistence/EntitiesPostgresPersistence");
const EntitiesPersistenceFixture_1 = require("./EntitiesPersistenceFixture");
suite('EntitiesPostgresPersistence', () => {
    let persistence;
    let fixture;
    let postgresUri = process.env['POSTGRES_SERVICE_URI'];
    let postgresHost = process.env['POSTGRES_SERVICE_HOST'] || 'localhost';
    let postgresPort = process.env['POSTGRES_SERVICE_PORT'] || 5432;
    let postgresDatabase = process.env['POSTGRES_SERVICE_DB'] || 'test';
    let postgresUser = process.env['POSTGRES_USER'] || 'postgres';
    let postgresPassword = process.env['POSTGRES_PASS'] || 'postgres';
    // Exit if postgres connection is not set
    if (postgresUri == null && postgresHost == null)
        return;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new EntitiesPostgresPersistence_1.EntitiesPostgresPersistence();
        persistence.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples('connection.uri', postgresUri, 'connection.host', postgresHost, 'connection.port', postgresPort, 'connection.database', postgresDatabase, 'credential.username', postgresUser, 'credential.password', postgresPassword));
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
//# sourceMappingURL=EntitiesPostgresPersistence.test.js.map