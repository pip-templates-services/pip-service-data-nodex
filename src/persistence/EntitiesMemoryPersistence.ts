/** @module persistence */

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesMemoryPersistence
    extends IdentifiableMemoryPersistence<EntityV1, string>
    implements IEntitiesPersistence {

    constructor() {
        super();

        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let siteId = filter.getAsNullableString('site_id');
        let name = filter.getAsNullableString('name');
        let names = filter.getAsObject('names');
        if (typeof names === 'string')
            names = names.split(',');
        if (!Array.isArray(names))
            names = null;

        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (siteId != null && item.site_id != siteId)
                return false;
            if (name != null && item.name != name)
                return false;
            if (names != null && names.indexOf(item.name) < 0)
                return false;
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public getOneByName(correlationId: string, name: string): Promise<EntityV1> {        
        let item = this._items.find((item) => item.name == name);

        if (item != null) this._logger.trace(correlationId, "Found entity by %s", name);
        else this._logger.trace(correlationId, "Cannot find entity by %s", name);

        return new Promise((resolve, reject) => {
            resolve(item);
        });
    }


}