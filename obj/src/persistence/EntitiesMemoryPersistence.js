"use strict";
/** @module persistence */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class EntitiesMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let siteId = filter.getAsNullableString('site_id');
        let name = filter.getAsNullableString('name');
        let names = filter.getAsObject('names');
        if (typeof names === 'string')
            names = names.split(',');
        if (!Array.isArray(names))
            names = null;
        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (siteId != null && item.site_id != siteId)
                return false;
            if (name != null && item.name != name)
                return false;
            if (names != null && names.indexOf(item.name) < 0)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
    getOneByName(correlationId, name) {
        let item = this._items.find((item) => item.name == name);
        if (item != null)
            this._logger.trace(correlationId, "Found entity by %s", name);
        else
            this._logger.trace(correlationId, "Cannot find entity by %s", name);
        return new Promise((resolve, reject) => {
            resolve(item);
        });
    }
}
exports.EntitiesMemoryPersistence = EntitiesMemoryPersistence;
//# sourceMappingURL=EntitiesMemoryPersistence.js.map