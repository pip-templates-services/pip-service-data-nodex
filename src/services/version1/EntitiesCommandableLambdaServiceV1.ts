/** @module services */

import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaService } from 'pip-services3-aws-nodex';

export class EntitiesCommandableLambdaServiceV1 extends CommandableLambdaService {
    public constructor() {
        super('v1.entities');
        this._dependencyResolver.put('controller', new Descriptor('pip-service-data', 'controller', '*', '*', '1.0'));
    }
}