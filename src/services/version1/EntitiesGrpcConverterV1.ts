/** @module clients */
/** @hidden */
let messages = require('../../../../src/protos/entities_v1_pb');

import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { EntityV1 } from '../../data/version1/EntityV1';


export class EntitiesGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        EntitiesGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: EntitiesGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject === 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (typeof map.set === 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        EntitiesGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromEntity(entity: EntityV1): any {
        if (entity == null) return null;

        let obj = new messages.Entity();

        obj.setId(entity.id);
        obj.setSiteId(entity.site_id);
        obj.setType(entity.type);
        obj.setName(entity.name);
        obj.setContent(entity.content);

        return obj;
    }

    public static toEntity(obj: any): EntityV1 {
        if (obj == null) return null;

        let entity: EntityV1 = {
            id: obj.getId(),
            site_id: obj.getSiteId(),
            type: obj.getType(),
            name: obj.getName(),
            content: obj.getContent()
        };

        return entity;
    }

    public static fromEntitiesPage(page: DataPage<EntityV1>): any {
        if (page == null) return null;

        let obj = new messages.EntitiesPage();

        obj.setTotal(page.total);
        let data = page.data.map(EntitiesGrpcConverterV1.fromEntity);
        obj.setDataList(data);

        return obj;
    }

    public static toEntitiesPage(obj: any): DataPage<EntityV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(EntitiesGrpcConverterV1.toEntity);
        let page: DataPage<EntityV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }
}