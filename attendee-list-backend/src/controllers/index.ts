import { Router, Response, Request } from "express";
import AuthController from "./authController";
import DataController from "./dataController";

export default class Controllers {
    public router: Router;

    private authController: AuthController = new AuthController();
    private dataController: DataController = new DataController();

    constructor() {
        this.router = Router();
        this.router.use("/api/auth", this.authController.router);
        this.router.use("/api/upload_data", this.dataController.router);
        this.router.get("/", this.landingPageController);
    }

    /**
     * Fetches the landing page when the route path is opened in the browser
     * @param req
     * @param res
     * @private
     */
    private async landingPageController(
        req: Request,
        res: Response,
    ): Promise<void> {
        res.status(200).json({"message": "Backend API"});
    }
}
