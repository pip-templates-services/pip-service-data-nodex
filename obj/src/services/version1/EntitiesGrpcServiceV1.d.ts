import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class EntitiesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getEntities;
    private getEntityById;
    private getEntityByName;
    private createEntity;
    private updateEntity;
    private deleteEntityById;
    register(): void;
}
