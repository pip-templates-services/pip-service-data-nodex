/** @module services */
import { FilterParams } from "pip-services3-commons-nodex";
import { IReferences } from "pip-services3-commons-nodex";
import { PagingParams } from "pip-services3-commons-nodex";
import { Descriptor } from "pip-services3-commons-nodex";
import { DataPage } from "pip-services3-commons-nodex";
import { LambdaService } from "pip-services3-aws-nodex";
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { IEntitiesController } from "../../logic/IEntitiesController";
import { EntityV1 } from "../../data/version1/EntityV1";
import { EntityV1Schema } from "../../data/version1/EntityV1Schema";

export class EntitiesLambdaServiceV1 extends LambdaService {
    private _controller: IEntitiesController;

    public constructor() {
        super("v1.entities");
        this._dependencyResolver.put(
            "controller",
            new Descriptor("pip-service-data", "controller", "default", "*", "*")
        );
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IEntitiesController>("controller");
    }

    public getEntities(params: any): Promise<DataPage<EntityV1>> {
        return this._controller.getEntities(
            params.correlation_id,
            new FilterParams(params.filter),
            new PagingParams(params.paging)
        );
    }

    public getEntityById(params: any): Promise<EntityV1> {
        return this._controller.getEntityById(
            params.correlation_id,
            params.entity_id
        );
    }

    public async getEntityByName(params: any): Promise<EntityV1> {
        return this._controller.getEntityByName(
            params.correlation_id,
            params.name
        );
    }

    public async createEntity(params: any): Promise<EntityV1> {
        return this._controller.createEntity(
            params.correlation_id,
            params.entity
        );
    }

    public async updateEntity(params: any): Promise<EntityV1>{
        return this._controller.updateEntity(
            params.correlation_id,
            params.entity
        );
    }

    public async deleteEntityById(params: any): Promise<EntityV1> {
        return this._controller.deleteEntityById(
            params.correlation_id,
            params.entity_id
        );
    }

    public register() {
        this.registerAction(
            'get_entities',
            new ObjectSchema(true)
                .withOptionalProperty("filter", new FilterParamsSchema())
                .withOptionalProperty("paging", new PagingParamsSchema())
            , this.getEntities);

        this.registerAction(
            'get_entity_by_id',
            new ObjectSchema(true)
                .withOptionalProperty("entity_id", TypeCode.String)
            , this.getEntityById);

        this.registerAction(
            'get_entity_by_name',
            new ObjectSchema(true)
                .withOptionalProperty("name", TypeCode.String)
            , this.getEntityByName);
    
        this.registerAction(
            'create_entity',
            new ObjectSchema(true)
                .withRequiredProperty("entity", new EntityV1Schema())
            , this.createEntity);

        this.registerAction(
            'update_entity',
            new ObjectSchema(true)
                .withRequiredProperty("entity", new EntityV1Schema())
            , this.updateEntity);

        this.registerAction(
            'delete_entity_by_id',
            new ObjectSchema(true)
                .withOptionalProperty("entity_id", TypeCode.String)
            , this.deleteEntityById);
    }
}