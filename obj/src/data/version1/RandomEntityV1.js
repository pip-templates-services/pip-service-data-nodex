"use strict";
/** @module data */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomEntityV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const EntityTypeV1_1 = require("./EntityTypeV1");
class RandomEntityV1 {
    static nextEntity(siteCount = 100) {
        return {
            id: pip_services3_commons_nodex_1.IdGenerator.nextLong(),
            site_id: RandomEntityV1.nextSiteId(siteCount),
            type: RandomEntityV1.nextEntityType(),
            name: pip_services3_commons_nodex_3.RandomString.nextString(10, 25),
            content: pip_services3_commons_nodex_3.RandomString.nextString(0, 50)
        };
    }
    static nextSiteId(siteCount = 100) {
        return pip_services3_commons_nodex_2.RandomInteger.nextInteger(1, siteCount).toString();
    }
    static nextEntityType() {
        let choice = pip_services3_commons_nodex_2.RandomInteger.nextInteger(0, 3);
        switch (choice) {
            case 0:
                return EntityTypeV1_1.EntityTypeV1.Type2;
            case 1:
                return EntityTypeV1_1.EntityTypeV1.Type1;
            case 2:
                return EntityTypeV1_1.EntityTypeV1.Type3;
            case 3:
                return EntityTypeV1_1.EntityTypeV1.Unknown;
            default:
                return EntityTypeV1_1.EntityTypeV1.Unknown;
        }
    }
}
exports.RandomEntityV1 = RandomEntityV1;
//# sourceMappingURL=RandomEntityV1.js.map