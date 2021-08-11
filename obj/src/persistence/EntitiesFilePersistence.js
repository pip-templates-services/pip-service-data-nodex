"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const EntitiesMemoryPersistence_1 = require("./EntitiesMemoryPersistence");
class EntitiesFilePersistence extends EntitiesMemoryPersistence_1.EntitiesMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.EntitiesFilePersistence = EntitiesFilePersistence;
//# sourceMappingURL=EntitiesFilePersistence.js.map