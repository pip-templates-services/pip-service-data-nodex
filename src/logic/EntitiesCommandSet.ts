/** @module logic */

import { CommandSet } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';

import { EntityV1Schema } from '../data/version1/EntityV1Schema';
import { IEntitiesController } from './IEntitiesController';

export class EntitiesCommandSet extends CommandSet {
    private _controller: IEntitiesController;

    constructor(controller: IEntitiesController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeGetEntitiesCommand());
        this.addCommand(this.makeGetEntityByIdCommand());
        this.addCommand(this.makeGetEntityByNameCommand());
        this.addCommand(this.makeCreateEntityCommand());
        this.addCommand(this.makeUpdateEntityCommand());
        this.addCommand(this.makeDeleteEntityByIdCommand());
    }

    private makeGetEntitiesCommand(): ICommand {
        return new Command(
            'get_entities',
            new ObjectSchema(true)
                .withOptionalProperty('filter', new FilterParamsSchema())
                .withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get('filter'));
                let paging = PagingParams.fromValue(args.get('paging'));
                return await this._controller.getEntities(correlationId, filter, paging);
            }
        );
    }

    private makeGetEntityByIdCommand(): ICommand {
        return new Command(
            'get_entity_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('entity_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let entityId = args.getAsString('entity_id');
                return await this._controller.getEntityById(correlationId, entityId);
            }
        );
    }

    private makeGetEntityByNameCommand(): ICommand {
        return new Command(
            'get_entity_by_name',
            new ObjectSchema(true)
                .withRequiredProperty('name', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let name = args.getAsString('name');
                return await this._controller.getEntityByName(correlationId, name);
            }
        );
    }

    private makeCreateEntityCommand(): ICommand {
        return new Command(
            'create_entity',
            new ObjectSchema(true)
                .withRequiredProperty('entity', new EntityV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let entity = args.getAsObject('entity');
                return await this._controller.createEntity(correlationId, entity);
            }
        );
    }   

    private makeUpdateEntityCommand(): ICommand {
        return new Command(
            'update_entity',
            new ObjectSchema(true)
                .withRequiredProperty('entity', new EntityV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let entity = args.getAsObject('entity');
                return await this._controller.updateEntity(correlationId, entity);
            }
        );
    }   
    
    private makeDeleteEntityByIdCommand(): ICommand {
        return new Command(
            'delete_entity_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('entity_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let entityId = args.getAsString('entity_id');
                return await this._controller.deleteEntityById(correlationId, entityId);
            }
        );
    }

}