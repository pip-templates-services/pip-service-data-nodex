/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IdentifiableJsonMySqlPersistence } from 'pip-services3-mysql-nodex';
import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesJsonMySqlPersistence 
    extends IdentifiableJsonMySqlPersistence<EntityV1, string> 
    implements IEntitiesPersistence
{
    public constructor() {
        super('entities_json');
    }

    protected defineSchema(): void {
        this.clearSchema();
        this.ensureTable();
        this.ensureSchema('ALTER TABLE `entities_json` ADD `data_id` VARCHAR(50) AS (JSON_UNQUOTE(`data`->"$.id"))');
        this.ensureIndex('entities_json_id', { "data_id": 1 }, { unique: true });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let filters = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("data->'$.id'='" + id + "'");

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) 
            filters.push("data->'$.site_id'='" + siteId + "'");

        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("data->'$.name'='" + name + "'");
    
        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            filters.push("data->'$.name' IN ('" + names.join("','") + "')");
        }
    
        return filters.length > 0 ? filters.join(" AND ") : null;        
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null);
    }

    public async getOneByName(correlationId: string, name: string): Promise<EntityV1> {
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE data->'$.name' = '" + name + "'";

        let item = await new Promise<any>((resolve, reject) => {
            this._client.query(query, null, (err, result) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                let item = result && result[0] ? result[0] || null : null; 
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