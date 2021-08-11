/** @module data */
import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class EntityV1 implements IStringIdentifiable {
    public id: string;
    public site_id: string;
    public type?: string;
    public name?: string;
    public content?: string;
}