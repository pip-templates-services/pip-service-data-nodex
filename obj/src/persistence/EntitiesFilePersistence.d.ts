/** @module persistence */
import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { EntityV1 } from '../data/version1/EntityV1';
import { EntitiesMemoryPersistence } from './EntitiesMemoryPersistence';
export declare class EntitiesFilePersistence extends EntitiesMemoryPersistence {
    protected _persister: JsonFilePersister<EntityV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
