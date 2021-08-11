"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityV1Schema = void 0;
/** @module data */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class EntityV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('site_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('content', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.EntityV1Schema = EntityV1Schema;
//# sourceMappingURL=EntityV1Schema.js.map