/** @module services */
import { IReferences } from "pip-services3-commons-nodex";
import { RestService } from "pip-services3-rpc-nodex";
export declare class EntitiesRestServiceV1 extends RestService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    getEntities(req: any, res: any): Promise<void>;
    getEntityById(req: any, res: any): Promise<void>;
    getEntityByName(req: any, res: any): Promise<void>;
    createEntity(req: any, res: any): Promise<void>;
    updateEntity(req: any, res: any): Promise<void>;
    deleteEntityById(req: any, res: any): Promise<void>;
    register(): void;
}
