/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<EntityV1, string> 
    implements IEntitiesPersistence {

    constructor() {
        super('test', 'entities');
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let filters = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");

        // To search for a partial match:
        let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null)
            console.log("(id LIKE '" + idStarts + "%')")
            filters.push("(id LIKE '" + idStarts + "%')"); 

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("site_id='" + siteId + "'");

        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("name='" + name + "'"); 
        
        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            filters.push("(name IN ['" + names.join("','") + "'])");
        }

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByName(correlationId: string, name: string): Promise<EntityV1> {
        let page = await this.getPageByFilter(correlationId, FilterParams.fromTuples('name', name ), null);
        return page.data[0];
    }
}