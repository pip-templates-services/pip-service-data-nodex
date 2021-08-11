/** @module persistence */

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../data/version1/EntityV1';

export interface IEntitiesPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>>;
    getOneById(correlationId: string, id: string): Promise<EntityV1>;
    getOneByName(correlationId: string, name: string): Promise<EntityV1>;
    create(correlationId: string, item: EntityV1): Promise<EntityV1>;
    update(correlationId: string, item: EntityV1): Promise<EntityV1>;
    deleteById(correlationId: string, id: string): Promise<EntityV1>;
}