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
exports.EntitiesJsonMySqlPersistence = void 0;
/** @module persistence */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mysql_nodex_1 = require("pip-services3-mysql-nodex");
class EntitiesJsonMySqlPersistence extends pip_services3_mysql_nodex_1.IdentifiableJsonMySqlPersistence {
    constructor() {
        super('entities_json');
    }
    defineSchema() {
        this.clearSchema();
        this.ensureTable();
        this.ensureSchema('ALTER TABLE `entities_json` ADD `data_id` VARCHAR(50) AS (JSON_UNQUOTE(`data`->"$.id"))');
        this.ensureIndex('entities_json_id', { "data_id": 1 }, { unique: true });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("data->'$.id'='" + id + "'");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("data->'$.site_id'='" + siteId + "'");
        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("data->'$.name'='" + name + "'");
        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            filters.push("data->'$.name' IN ('" + names.join("','") + "')");
        }
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "id", null);
    }
    getOneByName(correlationId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "SELECT * FROM " + this.quoteIdentifier(this._tableName) + " WHERE data->'$.name' = '" + name + "'";
            let item = yield new Promise((resolve, reject) => {
                this._client.query(query, null, (err, result) => {
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    let item = result && result[0] ? result[0] || null : null;
                    resolve(item);
                });
            });
            if (item == null)
                this._logger.trace(correlationId, "Cannot find entity with name=%s", this._tableName, name);
            else
                this._logger.trace(correlationId, "Found entity with name=%s", this._tableName, name);
            item = this.convertToPublic(item);
            return item;
        });
    }
}
exports.EntitiesJsonMySqlPersistence = EntitiesJsonMySqlPersistence;
//# sourceMappingURL=EntitiesJsonMySqlPersistence.js.map