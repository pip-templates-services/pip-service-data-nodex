import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { EntityV1 } from '../../data/version1/EntityV1';
export declare class EntitiesGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromEntity(entity: EntityV1): any;
    static toEntity(obj: any): EntityV1;
    static fromEntitiesPage(page: DataPage<EntityV1>): any;
    static toEntitiesPage(obj: any): DataPage<EntityV1>;
}
