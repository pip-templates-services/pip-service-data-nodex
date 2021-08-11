/** @module persistence */
import { IdentifiableJsonSqlServerPersistence } from 'pip-services3-sqlserver-nodex';

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesJsonSqlServerPersistence
    extends IdentifiableJsonSqlServerPersistence<EntityV1, string>
    implements IEntitiesPersistence {

    public constructor() {
      super("entities_json");
    }

    protected defineSchema(): void {
      this.clearSchema();
      this.ensureTable();
      this.ensureSchema("ALTER TABLE [entities_json] ADD [data_key] AS JSON_VALUE([data],'$.id')")
      this.ensureIndex('entities_json_key', { data_key: 1 }, { unique: true });
    }

    private composeFilter(filter: FilterParams): any {
      filter = filter || new FilterParams();

      let filters = [];

      let id = filter.getAsNullableString('id');
      if (id != null)
          filters.push("JSON_VALUE([data],'$.id')='" + id + "'");

      let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) 
        filters.push("JSON_VALUE([data],'$.site_id')='" + siteId + "'");

      let tempIds = filter.getAsNullableString("ids");
      if (tempIds != null) {
          let ids = tempIds.split(",");
          filters.push("JSON_VALUE([data], '$.id') IN ('" + ids.join("','") + "')");
      }

      let name = filter.getAsNullableString('name');
      if (name != null)
         filters.push("JSON_VALUE([data],'$.name')='" + name + "'");

      let tempNames = filter.getAsNullableString('names');
      if (tempNames != null) {
          let names = tempNames.split(',');
          filters.push("JSON_VALUE([data], '$.name') IN ('" + names.join("','") + "')");
      }

      return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
      return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null);
    }  

    public async getOneByName(correlationId: string, name: string): Promise<EntityV1> {        
      let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE JSON_VALUE([data],'$.name')='" + name + "'";
      let params = [ name ];
        
      let request = this.createRequest(params);
      let item = await new Promise<any>((resolve, reject) => {
        request.query(query, (err, result) => {
          if (err != null) {
            reject(err);
            return;
          }
          let item = result && result.recordset ? result.recordset[0] || null : null; 
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