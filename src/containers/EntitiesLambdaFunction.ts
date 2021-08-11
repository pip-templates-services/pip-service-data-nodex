/** @module container */

import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { EntitiesServiceFactory } from '../build/EntitiesServiceFactory';

export class EntitiesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("entities", "Entities microservice");
        this._dependencyResolver.put('controller', new Descriptor('entities', 'controller', 'default', '*', '*'));
        this._factories.add(new EntitiesServiceFactory());
    }
}

export const handler = new EntitiesLambdaFunction().getHandler();