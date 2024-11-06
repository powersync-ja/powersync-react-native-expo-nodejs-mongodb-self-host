import {Router, Request, Response} from "express";
import config from "../config";
import MongoPersistence from "../mongo/mongoPersistence";

export default class DataController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.patch("/", this.update);
        this.router.put("/", this.put);
        this.router.delete("/", this.delete);
    }

    private async update(req: Request, res: Response) {
        try {
            if (!req.body) {
                res.status(400).send({
                    message: 'Invalid body provided'
                });
                return;
            }
            const mongoPersistence = new MongoPersistence({
                name: config.database.database,
                uri: config.database.uri
            });
            await mongoPersistence.init();
            await mongoPersistence.update(req.body);
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: err,
            });
        }
    }

    private async put(req: Request, res: Response) {
        try {
            if (!req.body) {
                res.status(400).send({
                    message: 'Invalid body provided'
                });
                return;
            }
            const mongoPersistence = new MongoPersistence({
                name: config.database.database,
                uri: config.database.uri
            });
            await mongoPersistence.init();
            await mongoPersistence.upsert(req.body);
            res.status(200).send();
        } catch (err) {
            res.status(500).send({
                message: err,
            });
        }
    }

    private async delete(req: Request, res: Response) {
        try {
            if (!req.body) {
                res.status(400).send({
                    message: 'Invalid body provided'
                });
                return;
            }
            const mongoPersistence = new MongoPersistence({
                name: config.database.database,
                uri: config.database.uri
            });
            await mongoPersistence.init();
            await mongoPersistence.delete(req.body);
            res.status(200).send();
        } catch (err) {
            res.status(500).send({
                message: err,
            });
        }
    }
}
