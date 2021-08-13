import { IReferences } from "pip-services3-commons-nodex";
import { DataPage } from "pip-services3-commons-nodex";
import { LambdaService } from "pip-services3-aws-nodex";
import { EntityV1 } from "../../data/version1/EntityV1";
export declare class EntitiesLambdaServiceV1 extends LambdaService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    getEntities(params: any): Promise<DataPage<EntityV1>>;
    getEntityById(params: any): Promise<EntityV1>;
    getEntityByName(params: any): Promise<EntityV1>;
    createEntity(params: any): Promise<EntityV1>;
    updateEntity(params: any): Promise<EntityV1>;
    deleteEntityById(params: any): Promise<EntityV1>;
    register(): void;
}
