/** @module services */
/** @hidden */
let services = require('../../../../src/protos/entities_v1_grpc_pb');
/** @hidden */
let messages = require('../../../../src/protos/entities_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IEntitiesController } from '../../logic/IEntitiesController';
import { EntitiesGrpcConverterV1 } from './EntitiesGrpcConverterV1';

export class EntitiesGrpcServiceV1 extends GrpcService {
    private _controller: IEntitiesController;
	
    public constructor() {
        super(services.EntitiesService);
        this._dependencyResolver.put('controller', new Descriptor("entities", "controller", "*", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IEntitiesController>('controller');
    }

    private async getEntities(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        EntitiesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = EntitiesGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.EntitiesPageReply();

        try {
            let result = await this._controller.getEntities(
                correlationId,
                filter,
                paging
            );
            let page = EntitiesGrpcConverterV1.fromEntitiesPage(result);
            response.setPage(page);
        } catch (err) {
            let error = EntitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getEntityById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getEntityId();

        let response = new messages.EntityReply();

        try {
            let result = await this._controller.getEntityById(
                correlationId,
                id
            );
            let entity = EntitiesGrpcConverterV1.fromEntity(result);
            response.setEntity(entity)
        } catch (err) {
            let error = EntitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getEntityByName(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let name = call.request.getName();
    
        let response = new messages.EntityReply();

        try {
            let result = await this._controller.getEntityByName(
                correlationId,
                name
            );
            let entity = EntitiesGrpcConverterV1.fromEntity(result);
            response.setEntity(entity)
        } catch (err) {
            let error = EntitiesGrpcConverterV1.fromError(err);
            response.setError(error);            
        }

        return response;
    }

    private async createEntity(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let entity = call.request.getEntity();
        entity = EntitiesGrpcConverterV1.toEntity(entity);

        let response = new messages.EntityReply();

        try {
            let result = await this._controller.createEntity(
                correlationId,
                entity
            );
            entity = EntitiesGrpcConverterV1.fromEntity(result);
            response.setEntity(entity)
        } catch (err) {
            let error = EntitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async updateEntity(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let entity = call.request.getEntity();
        entity = EntitiesGrpcConverterV1.toEntity(entity);

        let response = new messages.EntityReply();

        try {
            let result = await this._controller.updateEntity(
                correlationId,
                entity
            );
            entity = EntitiesGrpcConverterV1.fromEntity(result);
            response.setEntity(entity)
        } catch (err) {
            let error = EntitiesGrpcConverterV1.fromError(err);
            response.setError(error);            
        }

        return response;
    }

    private async deleteEntityById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let id = call.request.getEntityId();;

        let response = new messages.EntityReply();

        try {
            let result = await this._controller.deleteEntityById(
                correlationId,
                id
            );
            let entity = EntitiesGrpcConverterV1.fromEntity(result);
            response.setEntity(entity)
        } catch (err) {
            let error = EntitiesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    public register() {
        this.registerMethod(
            'get_entities', 
            null,
            this.getEntities
        );

        this.registerMethod(
            'get_entity_by_id', 
            null,
            this.getEntityById
        );

        this.registerMethod(
            'get_entity_by_name', 
            null,
            this.getEntityByName
        );

        this.registerMethod(
            'create_entity', 
            null,
            this.createEntity
        );

        this.registerMethod(
            'update_entity', 
            null,
            this.updateEntity
        );

        this.registerMethod(
            'delete_entity_by_id', 
            null,
            this.deleteEntityById
        );
    }
}