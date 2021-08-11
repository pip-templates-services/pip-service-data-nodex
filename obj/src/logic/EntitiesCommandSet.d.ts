/** @module logic */
import { CommandSet } from 'pip-services3-commons-nodex';
import { IEntitiesController } from './IEntitiesController';
export declare class EntitiesCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IEntitiesController);
    private makeGetEntitiesCommand;
    private makeGetEntityByIdCommand;
    private makeGetEntityByNameCommand;
    private makeCreateEntityCommand;
    private makeUpdateEntityCommand;
    private makeDeleteEntityByIdCommand;
}
