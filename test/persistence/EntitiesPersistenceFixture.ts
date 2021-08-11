const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../../src/data/version1/EntityV1';
import { EntityTypeV1 } from '../../src/data/version1/EntityTypeV1';
import { IEntitiesPersistence } from '../../src/persistence/IEntitiesPersistence';

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
const ENTITY3: EntityV1 = {
    id: '3',
    name: '00003',
    type: EntityTypeV1.Type1,
    site_id: '2',
    content: 'DEF'
};

export class EntitiesPersistenceFixture {
    private _persistence: IEntitiesPersistence;

    public constructor(persistence: IEntitiesPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateEntities() {
        // Create the first entity
        let entity = await this._persistence.create(null, ENTITY1);
        assert.isObject(entity);
        assert.equal(ENTITY1.name, entity.name);
        assert.equal(ENTITY1.site_id, entity.site_id);
        assert.equal(ENTITY1.type, entity.type);
        assert.equal(ENTITY1.name, entity.name);
        assert.isNotNull(entity.content);

        // Create the second entity
        entity = await this._persistence.create(null, ENTITY2);
        assert.isObject(entity);
        assert.equal(ENTITY2.name, entity.name);
        assert.equal(ENTITY2.site_id, entity.site_id);
        assert.equal(ENTITY2.type, entity.type);
        assert.equal(ENTITY2.name, entity.name);
        assert.isNotNull(entity.content);

        // Create the third entity
        entity = await this._persistence.create(null, ENTITY3);
        assert.isObject(entity);
        assert.equal(ENTITY3.name, entity.name);
        assert.equal(ENTITY3.site_id, entity.site_id);
        assert.equal(ENTITY3.type, entity.type);
        assert.equal(ENTITY3.name, entity.name);
        assert.isNotNull(entity.content);
    }

    public async testCrudOperations() {
        // Create items
        await this.testCreateEntities();

        // Get all entities
        let page = await this._persistence.getPageByFilter(
            null, new FilterParams(), new PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        let entity1 = page.data[0];

        // Update the entity
        entity1.name = 'ABC';

        let entity = await this._persistence.update(null, entity1);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);
        assert.equal('ABC', entity.name);

        // Get entity by name
        entity = await this._persistence.getOneByName(null, entity1.name);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Delete the entity
        entity = await this._persistence.deleteById(null, entity1.id);
        assert.isObject(entity);
        assert.equal(entity1.id, entity.id);

        // Try to get deleted entity
        entity = await this._persistence.getOneById(null, entity1.id);
        assert.isNull(entity || null);
    }

    public async testGetWithFilters() {
        // Create items
        await this.testCreateEntities();

        // Filter by id
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'id', '1'
            ),
            new PagingParams()
        );

        assert.lengthOf(page.data, 1);

        // Filter by name
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'name', '00002'
            ),
            new PagingParams()
        );

        assert.lengthOf(page.data, 1);

        // Filter by names
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'names', '00001,00003'
            ),
            new PagingParams()
        );

        assert.lengthOf(page.data, 2);

        // Filter by site_id
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'site_id', '1'
            ),
            new PagingParams()
        );

        assert.lengthOf(page.data, 2);
    }
}
