/** @module data */
import { EntityV1 } from './EntityV1';
export declare class RandomEntityV1 {
    static nextEntity(siteCount?: number): EntityV1;
    static nextSiteId(siteCount?: number): string;
    static nextEntityType(): string;
}
