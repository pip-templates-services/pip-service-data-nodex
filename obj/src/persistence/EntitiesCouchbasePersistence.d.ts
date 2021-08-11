/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-nodex';
import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';
export declare class EntitiesCouchbasePersistence extends IdentifiableCouchbasePersistence<EntityV1, string> implements IEntitiesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>>;
    getOneByName(correlationId: string, name: string): Promise<EntityV1>;
}
