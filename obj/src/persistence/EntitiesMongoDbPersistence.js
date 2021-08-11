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
exports.EntitiesMongoDbPersistence = void 0;
/** @module persistence */
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class EntitiesMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('entities');
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null)
            criteria.push({ site_id: siteId });
        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });
        let tempNames = filter.getAsNullableString('names');
        if (tempNames != null) {
            let names = tempNames.split(',');
            criteria.push({ name: { $in: names } });
        }
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
    getOneByName(correlationId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {
                name: name
            };
            let item = yield new Promise((resolve, reject) => {
                this._collection.findOne(criteria, (err, item) => {
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    resolve(item);
                });
            });
            item = this.convertToPublic(item);
            if (item != null)
                this._logger.trace(correlationId, "Found entity by %s", name);
            else
                this._logger.trace(correlationId, "Cannot find entity by %s", name);
            return item;
        });
    }
}
exports.EntitiesMongoDbPersistence = EntitiesMongoDbPersistence;
//# sourceMappingURL=EntitiesMongoDbPersistence.js.map