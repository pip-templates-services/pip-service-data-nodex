/** @module services */
import { IReferences } from "pip-services3-commons-nodex";
import { Descriptor } from "pip-services3-commons-nodex";
import { RestService } from "pip-services3-rpc-nodex";
import { IEntitiesController } from "../../logic/IEntitiesController";

export class EntitiesRestServiceV1 extends RestService {
    private _controller: IEntitiesController;

    public constructor() {
        super();
        this._baseRoute = "v1/entities";
        this._dependencyResolver.put(
            "controller",
            new Descriptor("entities", "controller", "default", "*", "*")
        );
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IEntitiesController>("controller");
    }

    public async getEntities(req: any, res: any) {
        let correlationId = this.getCorrelationId(req);
        let filter = req.param('filter');
        let paging = req.param('paging');

        try {
            let result = await this._controller.getEntities(correlationId, filter, paging);
            this.sendResult(req, res, result);
        } catch(err) {
            this.sendError(req, res, err);
        }
    }

    public async getEntityById(req: any, res: any) {
        let correlationId = this.getCorrelationId(req);
        let id = req.route.params.id;

        try {
            let result = await this._controller.getEntityById(correlationId, id);
            this.sendResult(req, res, result);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getEntityByName(req: any, res: any) {
        let correlationId = this.getCorrelationId(req);
        let name = req.route.params.name;

        try {
            let result = await this._controller.getEntityByName(correlationId, name);
            this.sendResult(req, res,  result);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async createEntity(req: any, res: any) {
        let correlationId = this.getCorrelationId(req);
        let data = req.body;

        try {
            let result = await this._controller.createEntity(correlationId, data);
            this.sendResult(req, res, result);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async updateEntity(req: any, res: any) {
        let correlationId = this.getCorrelationId(req);
        let data = req.body;

        try {
            let result = await this._controller.updateEntity(correlationId, data);
            this.sendResult(req, res, result);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async deleteEntityById(req: any, res: any) {
        let correlationId = this.getCorrelationId(req);
        let id = req.route.params.id;

        try {
            let result = await this._controller.deleteEntityById(correlationId, id);
            this.sendResult(req, res, result);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public register() {
        this.registerRoute('get', '/entities', null, this.getEntities);
        this.registerRoute('get', '/entities/:id', null, this.getEntityById);
        this.registerRoute('get', '/entities/name/:name', null, this.getEntityByName);
        this.registerRoute('post', '/entities', null, this.createEntity);
        this.registerRoute('put', '/entities', null, this.updateEntity);
        this.registerRoute('del', '/entities/:id', null, this.deleteEntityById);

        this.registerOpenApiSpecFromFile("./src/swagger/entities_v1.yaml");
    }
}