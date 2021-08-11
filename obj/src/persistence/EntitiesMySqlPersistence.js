"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesMySqlPersistence = void 0;
/** @module persistence */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mysql_nodex_1 = require("pip-services3-mysql-nodex");
class EntitiesMySqlPersistence extends pip_services3_mysql_nodex_1.IdentifiableMySqlPersistence {
    constructor() {
        super('entities');
    }
    defineSchema() {
        this.clearSchema();
        this.ensureSchema("CREATE TABLE entities (id VARCHAR(32), site_id VARCHAR(32), type VARCHAR(15), name VARCHAR(50), content VARCHAR(150))");
        this.ensureIndex("entities_site_id", { site_id: 1 });
    }
    convertToPublic(value) {
        for (let key in value) {
            if (typeof value[key] == 'string' && value[key].startsWith('{'))
                value[key] = JSON.parse(value[key]);
        }
        return value;
    }
    convertFromPublic(value) {
        for (let key in value) {
            if (typeof value[key] == 'object')
                value[key] = JSON.stringify(value[key]);
        }
        return value;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("site_id='" + siteId + "'");
        let tempIds = filter.getAsNullableString("ids");
        if (tempIds != null) {
            let ids = tempIds.split(",");
            filters.push("id IN ('" + ids.join("','") + "')");
        }
        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("name='" + name + "'");
        let tempNames = filter.getAsNullableString('names');
        if (tempNames) {
            let names = tempNames.split(',');
            filters.push("name IN ('" + names.join("','") + "')");
        }
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null);
    }
    getOneByName(correlationId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE name='" + name + "'";
            let item = yield new Promise((resolve, reject) => {
                this._client.query(query, (err, result) => {
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let item = result && result[0] ? result[0] || null : null;
                    resolve(item);
                });
            });
            if (item == null)
                this._logger.trace(correlationId, "Nothing found from %s with name = %s", this._tableName, name);
            else
                this._logger.trace(correlationId, "Retrieved from %s with name = %s", this._tableName, name);
            item = this.convertToPublic(item);
            return item;
        });
    }
}
exports.EntitiesMySqlPersistence = EntitiesMySqlPersistence;
//# sourceMappingURL=EntitiesMySqlPersistence.js.map