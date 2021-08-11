/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';

export class EntitiesMongoDbPersistence
    extends IdentifiableMongoDbPersistence<EntityV1, string>
    implements IEntitiesPersistence {

    constructor() {
        super('entities');
        this._maxPageSize = 1000;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null) 
            criteria.push({ _id: id });

        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            criteria.push({ site_id: siteId });

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            criteria.push({ name: { $in: names } });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByName(correlationId: string, name: string): Promise<EntityV1> {
        let criteria = {
            name: name
        };

        let item = await new Promise<any>((resolve, reject) => {
            this._collection.findOne(criteria, (err, item) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(item);
            });
        });

        item = this.convertToPublic(item);

        if (item != null) this._logger.trace(correlationId, "Found entity by %s", name);
        else this._logger.trace(correlationId, "Cannot find entity by %s", name);

        return item;
    }
}