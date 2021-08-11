/** @module services */

import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class EntitiesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1.entities');
        this._dependencyResolver.put('controller', new Descriptor('entities', 'controller', '*', '*', '1.0'));
    }
}