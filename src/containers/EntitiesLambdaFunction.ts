/** @module container */

import { LambdaFunction } from 'pip-services3-aws-nodex';
import { EntitiesServiceFactory } from '../build/EntitiesServiceFactory';

export class EntitiesLambdaFunction extends LambdaFunction {
    public constructor() {
        super("pip-service-data", "Entities data microservice");
        this._factories.add(new EntitiesServiceFactory());
    }
}

export const handler = new EntitiesLambdaFunction().getHandler();