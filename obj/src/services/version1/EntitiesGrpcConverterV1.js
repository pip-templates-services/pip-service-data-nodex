"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesGrpcConverterV1 = void 0;
/** @module clients */
/** @hidden */
let messages = require('../../../../src/protos/entities_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
class EntitiesGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_2.ErrorDescriptionFactory.create(err);
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
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: EntitiesGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_3.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject === 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (typeof map.set === 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        EntitiesGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromEntity(entity) {
        if (entity == null)
            return null;
        let obj = new messages.Entity();
        obj.setId(entity.id);
        obj.setSiteId(entity.site_id);
        obj.setType(entity.type);
        obj.setName(entity.name);
        obj.setContent(entity.content);
        return obj;
    }
    static toEntity(obj) {
        if (obj == null)
            return null;
        let entity = {
            id: obj.getId(),
            site_id: obj.getSiteId(),
            type: obj.getType(),
            name: obj.getName(),
            content: obj.getContent()
        };
        return entity;
    }
    static fromEntitiesPage(page) {
        if (page == null)
            return null;
        let obj = new messages.EntitiesPage();
        obj.setTotal(page.total);
        let data = page.data.map(EntitiesGrpcConverterV1.fromEntity);
        obj.setDataList(data);
        return obj;
    }
    static toEntitiesPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(EntitiesGrpcConverterV1.toEntity);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.EntitiesGrpcConverterV1 = EntitiesGrpcConverterV1;
//# sourceMappingURL=EntitiesGrpcConverterV1.js.map