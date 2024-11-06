import {Router, Request, Response} from "express";

export default class DataController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", (req, res) => {
            res.send("Hi");
        })
        this.router.patch("/", this.update);
        this.router.put("/", this.put);
        this.router.delete("/", this.delete);
    }

    private async update(req: Request, res: Response) {
        console.log(req.body);
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
        console.log(req.body);
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
        console.log(req.body);
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
