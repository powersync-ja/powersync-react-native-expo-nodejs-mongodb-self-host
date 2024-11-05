import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger";
import Controllers from "./controllers";

export type ServerOptions = {
    port: number;
};

export default class Server {
    public app: express.Application;
    protected options: ServerOptions;
    private controllers: Controllers = new Controllers();

    constructor(options: ServerOptions) {
        this.options = options;
        this.app = express();
        this.init();
    }

    public init(): void {
        this.app.set("port", this.options.port);
        this.app.use(cors());
        this.app.use(
            express.json({
                limit: "50mb",
            }),
        );
        console.log("Server Config:", this.options);
        this.app.use(logger);

        this.app.use(this.controllers.router);
    }

    public async start(): Promise<void> {
        this.app.listen(this.app.get("port"), () => {
            console.log(
                `Server started and listening visit http://localhost:${this.options.port}`,
            );
        });
    }
}
