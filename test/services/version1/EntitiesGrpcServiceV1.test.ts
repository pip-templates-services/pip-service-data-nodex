const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const assert = require('chai').assert;

const services = require('../../../../src/protos/entities_v1_grpc_pb');
const messages = require('../../../../src/protos/entities_v1_pb');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../../../src/data/version1/EntityV1';
import { EntityTypeV1 } from '../../../src/data/version1/EntityTypeV1';
import { EntitiesMemoryPersistence } from '../../../src/persistence/EntitiesMemoryPersistence';
import { EntitiesController } from '../../../src/logic/EntitiesController';
import { EntitiesGrpcServiceV1 } from '../../../src/services/version1/EntitiesGrpcServiceV1';

const ENTITY1: EntityV1 = {
    id: '1',
    name: '00001',
    type: EntityTypeV1.Type1,
    site_id: '1',
    content: 'ABC'
};
const ENTITY2: EntityV1 = {
    id: '2',
    name: '00002',
    type: EntityTypeV1.Type2,
    site_id: '1',
    content: 'XYZ'
};

let grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EntitiesGrpcServiceV1', () => {
    let persistence: EntitiesMemoryPersistence;
    let controller: EntitiesController;
    let service: EntitiesGrpcServiceV1;
    let client: any;

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/entities_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).entities_v1.Entities;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    suiteSetup(async () => {
        persistence = new EntitiesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new EntitiesController();
        controller.configure(new ConfigParams());

        service = new EntitiesGrpcServiceV1();
        service.configure(grpcConfig);

        let references = References.fromTuples(
            new Descriptor('entities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('entities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('entities', 'service', 'grpc', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        await persistence.open(null);
        await service.open(null);
    });

    suiteTeardown(async () => {
        await service.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        // Create the first entity
        let entity = await new Promise<EntityV1>((resolve, reject) => {
            client.create_entity(
                {
                    entity: ENTITY1
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let entity = response ? response.entity : null;
                    resolve(entity);
                }
            );
        });
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);

        // Create the second entity
        entity = await new Promise<EntityV1>((resolve, reject) => {
            client.create_entity(
                {
                    entity: ENTITY2
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let entity = response ? response.entity : null;
                    resolve(entity);
                }
            );
        });
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);

        // Get all entities
        let page = await new Promise<DataPage<EntityV1>>((resolve, reject) => {
            client.get_entities(
                {
                    filter: new FilterParams(),
                    paging: new PagingParams()
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let page = response ? response.page : null;
                    resolve(page);
                }
            );
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        let entity1 = page.data[0];

        // Update the entity
        entity1.name = 'ABC';

        entity = await new Promise<EntityV1>((resolve, reject) => {
            client.update_entity(
                {
                    entity: entity1
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let entity = response ? response.entity : null;
                    resolve(entity);
                }
            );
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);

        // Get entity by name
        entity = await new Promise<EntityV1>((resolve, reject) => {
            client.get_entity_by_name(
                {
                    name: entity1.name
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let entity = response ? response.entity : null;
                    resolve(entity);
                }
            );
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Delete the entity
        entity = await new Promise<EntityV1>((resolve, reject) => {
            client.delete_entity_by_id(
                {
                    entity_id: entity1.id
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let entity = response ? response.entity : null;
                    resolve(entity);
                }
            );
        });
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Try to get deleted entity
        entity = await new Promise<EntityV1>((resolve, reject) => {
            client.get_entity_by_id(
                {
                    entity_id: entity1.id
                },
                (err, response) => {
                    err = err || response.error;
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let entity = response ? response.entity : null;
                    resolve(entity);
                }
            );
        });
        assert.isNull(entity);
    });

});