/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IdentifiablePostgresPersistence } from 'pip-services3-postgres-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesPostgresPersistence
    extends IdentifiablePostgresPersistence<EntityV1, string>
    implements IEntitiesPersistence {

    constructor() {
        super('entities');
        this._maxPageSize = 1000;
    }

    protected defineSchema(): void {
        this.clearSchema();
        this.ensureSchema('CREATE TABLE entities (id VARCHAR(32), site_id VARCHAR(32), type VARCHAR(15), name VARCHAR(25), content VARCHAR(150))');
        this.ensureIndex('entities_site_id', { site_id: 1 });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let filters = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) 
            filters.push("site_id='" + siteId + "'");

        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("name='" + name + "'");

        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            filters.push("name IN ('" + names.join("','") + "')");
        }
    
        return filters.length > 0 ? filters.join(" AND ") : null;        
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null);
    }

    public async getOneByName(correlationId: string, name: string): Promise<EntityV1> {
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE \"name\"=$1";
        let params = [ name ];

        let item = await new Promise<any>((resolve, reject) => {
            this._client.query(query, params, (err, result) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                let item = result && result.rows ? result.rows[0] || null : null; 
                resolve(item);
            });
        });

        if (item == null)
            this._logger.trace(correlationId, "Cannot find entity with name=%s", this._tableName, name);
        else
            this._logger.trace(correlationId, "Found entity with name=%s", this._tableName, name);

        item = this.convertToPublic(item);
        return item;
    }
}