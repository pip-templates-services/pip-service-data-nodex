/** @module persistence */
import { IdentifiableJsonSqlServerPersistence } from 'pip-services3-sqlserver-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from './IEntitiesPersistence';
export declare class EntitiesJsonSqlServerPersistence extends IdentifiableJsonSqlServerPersistence<EntityV1, string> implements IEntitiesPersistence {
    constructor();
    protected defineSchema(): void;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>>;
    getOneByName(correlationId: string, name: string): Promise<EntityV1>;
}
