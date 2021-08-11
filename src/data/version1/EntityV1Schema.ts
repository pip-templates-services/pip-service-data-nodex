/** @module data */
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class EntityV1Schema extends ObjectSchema {
    
    public constructor()
    {
        super();

        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('site_id', TypeCode.String);
        this.withOptionalProperty('type', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);
        this.withOptionalProperty('content', TypeCode.String);
    }
}