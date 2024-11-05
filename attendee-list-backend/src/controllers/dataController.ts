import {Router, Request, Response} from "express";
import config from "../config";

export default class DataController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.patch("/", this.patch);
        this.router.put("/", this.put);
        this.router.delete("/", this.delete);
    }

    private async patch(req: Request, res: Response) {
        if (!req.body) {
            res.status(400).send({
                message: 'Invalid body provided'
            });
            return;
        }
        res.send({

        });
    }

    private async put(req: Request, res: Response) {
        if (!req.body) {
            res.status(400).send({
                message: 'Invalid body provided'
            });
            return;
        }
        res.send({

        });
    }

    private async delete(req: Request, res: Response) {
        if (!req.body) {
            res.status(400).send({
                message: 'Invalid body provided'
            });
            return;
        }
        res.send({

        });
    }
}
