/** @module persistence */
import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { EntityV1 } from '../data/version1/EntityV1';
import { EntitiesMemoryPersistence } from './EntitiesMemoryPersistence';

export class EntitiesFilePersistence extends EntitiesMemoryPersistence {
    protected _persister: JsonFilePersister<EntityV1>;

    constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<EntityV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams) {
        super.configure(config);
        this._persister.configure(config);
    }
    
}