/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IdentifiableMySqlPersistence } from 'pip-services3-mysql-nodex';
import { EntityV1 } from '../data/version1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesMySqlPersistence extends IdentifiableMySqlPersistence<EntityV1, string> 
    implements IEntitiesPersistence {
    
    public constructor() {
        super('entities');
    }

    protected defineSchema(): void {
        this.clearSchema();
        this.ensureSchema("CREATE TABLE entities (id VARCHAR(32), site_id VARCHAR(32), type VARCHAR(15), name VARCHAR(50), content VARCHAR(150))");
        this.ensureIndex("entities_site_id", { site_id: 1 });
    }

    protected convertToPublic(value: any): any {
        for(let key in value) {
            if (typeof value[key] == 'string' && value[key].startsWith('{')) 
                value[key] = JSON.parse(value[key]);
        }

        return value;
    }
    
    protected convertFromPublic(value: any): any {
        for (let key in value) {
            if (typeof value[key] == 'object')
                value[key] = JSON.stringify(value[key]);
        }

        return value;
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
  
        let tempIds = filter.getAsNullableString("ids");
        if (tempIds != null) {
            let ids = tempIds.split(",");
            filters.push("id IN ('" + ids.join("','") + "')");
        }
  
        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("name='" + name + "'");
      
        let tempNames = filter.getAsNullableString('names');
        if (tempNames) {
            let names = tempNames.split(',');
            filters.push("name IN ('" + names.join("','") + "')");
        }
  
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
  
   public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null);
   }

    public async getOneByName(correlationId: string, name: string): Promise<EntityV1> {        
        let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE name='" + name + "'";

        let item = await new Promise<any>((resolve, reject) => {
            this._client.query(query, (err, result) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                let item = result && result[0] ? result[0] || null : null; 
                resolve(item);
            });    
        });

        if (item == null)
            this._logger.trace(correlationId, "Nothing found from %s with name = %s", this._tableName, name);
        else
            this._logger.trace(correlationId, "Retrieved from %s with name = %s", this._tableName, name);

        item = this.convertToPublic(item);
        return item;
    }
}