/** @module logic */
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { IEntitiesPersistence } from '../persistence/IEntitiesPersistence';
import { IEntitiesController } from './IEntitiesController';
import { EntityTypeV1 } from '../data/version1/EntityTypeV1';
import { EntitiesCommandSet } from './EntitiesCommandSet';

export class EntitiesController implements IEntitiesController, IConfigurable, IReferenceable, ICommandable {
    private _persistence: IEntitiesPersistence;
    private _commandSet: EntitiesCommandSet;

    public constructor() { }

    public configure(config: ConfigParams): void {

    }

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<IEntitiesPersistence>(
            new Descriptor('entities', 'persistence', '*', '*', '1.0')
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new EntitiesCommandSet(this);
        }

        return this._commandSet;
    }

    public getEntities(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<EntityV1>> {
        return this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public getEntityById(correlationId: string, entityId: string): Promise<EntityV1> {
        return this._persistence.getOneById(correlationId, entityId);
    }

    public getEntityByName(correlationId: string, entityId: string): Promise<EntityV1> {
        return this._persistence.getOneByName(correlationId, entityId);
    }

    public createEntity(correlationId: string, entity: EntityV1): Promise<EntityV1> {
        entity.id = entity.id || IdGenerator.nextLong();
        entity.type = entity.type || EntityTypeV1.Unknown;

        return this._persistence.create(correlationId, entity);
    }

    public updateEntity(correlationId: string, entity: EntityV1): Promise<EntityV1> {
        entity.type = entity.type || EntityTypeV1.Unknown;

        return this._persistence.update(correlationId, entity);
    }

    public deleteEntityById(correlationId: string, entityId: string): Promise<EntityV1> {
        return this._persistence.deleteById(correlationId, entityId);
    }

}