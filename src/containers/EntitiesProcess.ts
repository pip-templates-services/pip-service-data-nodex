/** @module container */
import { DefaultDataDogFactory } from 'pip-services3-datadog-nodex';
import { DefaultElasticSearchFactory } from 'pip-services3-elasticsearch-nodex';
import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultPrometheusFactory } from 'pip-services3-prometheus-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { EntitiesServiceFactory } from '../build/EntitiesServiceFactory';

export class EntitiesProcess extends ProcessContainer{
    public constructor(){
        super('entities', 'Entities microservice');

        this._factories.add(new EntitiesServiceFactory());
        this._factories.add(new DefaultElasticSearchFactory());
        this._factories.add(new DefaultPrometheusFactory());
        this._factories.add(new DefaultDataDogFactory());
        this._factories.add(new DefaultRpcFactory());
        this._factories.add(new DefaultSwaggerFactory());
    }
}