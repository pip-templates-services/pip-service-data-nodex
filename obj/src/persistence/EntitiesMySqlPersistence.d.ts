/** @module persistence */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMySqlPersistence } from 'pip-services3-mysql-nodex';
import { EntityV1 } from '../data/version1';
import { IEntitiesPersistence } from './IEntitiesPersistence';
export declare class EntitiesMySqlPersistence extends IdentifiableMySqlPersistence<EntityV1, string> implements IEntitiesPersistence {
    constructor();
    protected defineSchema(): void;
    protected convertToPublic(value: any): any;
    protected convertFromPublic(value: any): any;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>>;
    getOneByName(correlationId: string, name: string): Promise<EntityV1>;
}
