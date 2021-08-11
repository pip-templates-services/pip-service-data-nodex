/** @module data */
import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class EntityV1 implements IStringIdentifiable {
    id: string;
    site_id: string;
    type?: string;
    name?: string;
    content?: string;
}
