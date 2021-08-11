/** @module services */

import { CommandableHttpService } from 'pip-services3-rpc-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

export class EntitiesCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/entities');
        this._dependencyResolver.put('controller', new Descriptor('entities', 'controller', '*', '*', '1.0'));
    }
}