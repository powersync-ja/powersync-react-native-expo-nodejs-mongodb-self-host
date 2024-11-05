import {Router, Request, Response} from "express";
import { SignJWT, importJWK } from 'jose';
import config from "../config";
import {fetchKeys} from "../utils";

export default class AuthController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/token", this.token);
        this.router.get("/keys", this.keys);
    }

    private async token(req: Request, res: Response) {
        const keys = await fetchKeys();
        const powerSyncKey = keys.privateKey;

        const {user_id = 'UserID '} = req.query;

        const token = await new SignJWT({})
            .setProtectedHeader({
                alg: powerSyncKey.alg,
                kid: powerSyncKey.kid
            })
            .setSubject('UserID')
            .setIssuedAt()
            .setIssuer(config.powersync.jwtIssuer)
            .setAudience(config.powersync.url)
            .setExpirationTime('5m')
            .sign(powerSyncKey.key);
        res.send({
            token: token,
            powersync_url: config.powersync.url
        });
    }

    private async keys(req: Request, res: Response) {
        const keys = await fetchKeys();
        const powerSyncPublicKey = keys.publicKey;
        res.send({
            keys: [powerSyncPublicKey]
        });
    }
}
