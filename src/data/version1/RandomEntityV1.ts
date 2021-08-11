/** @module data */

import { IdGenerator } from 'pip-services3-commons-nodex'
import { RandomInteger } from 'pip-services3-commons-nodex'
import { RandomString } from 'pip-services3-commons-nodex'

import { EntityTypeV1 } from './EntityTypeV1';
import { EntityV1 } from './EntityV1'

export class RandomEntityV1 {
    public static nextEntity(siteCount: number = 100): EntityV1 {
        return <EntityV1> {
            id: IdGenerator.nextLong(),
            site_id: RandomEntityV1.nextSiteId(siteCount),
            type: RandomEntityV1.nextEntityType(),
            name: RandomString.nextString(10, 25),
            content: RandomString.nextString(0, 50)
        }
    }

    public static nextSiteId(siteCount: number = 100): string {
        return RandomInteger.nextInteger(1, siteCount).toString();
    }

    public static nextEntityType(): string {
        let choice = RandomInteger.nextInteger(0, 3);
        switch (choice) {
            case 0:
                return EntityTypeV1.Type2;
            case 1:
                return EntityTypeV1.Type1;
            case 2:
                return EntityTypeV1.Type3;
            case 3:
                return EntityTypeV1.Unknown;
            default:
                return EntityTypeV1.Unknown;
        }
    }

}