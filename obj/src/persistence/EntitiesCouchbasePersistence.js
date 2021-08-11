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
exports.EntitiesCouchbasePersistence = void 0;
/** @module persistence */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_couchbase_nodex_1 = require("pip-services3-couchbase-nodex");
class EntitiesCouchbasePersistence extends pip_services3_couchbase_nodex_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('test', 'entities');
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let filters = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");
        // To search for a partial match:
        let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null)
            console.log("(id LIKE '" + idStarts + "%')");
        filters.push("(id LIKE '" + idStarts + "%')");
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            filters.push("site_id='" + siteId + "'");
        let name = filter.getAsNullableString('name');
        if (name != null)
            filters.push("name='" + name + "'");
        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            filters.push("(name IN ['" + names.join("','") + "'])");
        }
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
    getOneByName(correlationId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this.getPageByFilter(correlationId, pip_services3_commons_nodex_1.FilterParams.fromTuples('name', name), null);
            return page.data[0];
        });
    }
}
exports.EntitiesCouchbasePersistence = EntitiesCouchbasePersistence;
//# sourceMappingURL=EntitiesCouchbasePersistence.js.map