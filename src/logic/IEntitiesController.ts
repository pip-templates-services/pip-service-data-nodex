/** @module logic */

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../data/version1/EntityV1';

export interface IEntitiesController {
    getEntities(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>>;

    getEntityById(correlationId: string, entityId: string): Promise<EntityV1>;

    getEntityByName(correlationId: string, entityId: string): Promise<EntityV1>;

    createEntity(correlationId: string, entity: EntityV1): Promise<EntityV1>;

    updateEntity(correlationId: string, entity: EntityV1): Promise<EntityV1>;

    deleteEntityById(correlationId: string, entityId: string): Promise<EntityV1>;
}