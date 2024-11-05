import * as jose from 'jose';
import * as crypto from 'crypto';
import config from "../config";
import {importJWK} from "jose";

const keys = {
    privateKey: null,
    publicKey: null
} as any;

export const generateKeyPair = async () => {
    const alg = 'RS256';
    const kid = `powersync-${crypto.randomBytes(5).toString('hex')}`;

    const { publicKey, privateKey } = await jose.generateKeyPair(alg, {
        extractable: true
    });

    const privateJwk = {
        ...(await jose.exportJWK(privateKey)),
        alg,
        kid
    };
    const publicJwk = {
        ...(await jose.exportJWK(publicKey)),
        alg,
        kid
    };

    const privateBase64 = Buffer.from(JSON.stringify(privateJwk)).toString('base64');
    const publicBase64 = Buffer.from(JSON.stringify(publicJwk)).toString('base64');

    return {
        privateBase64,
        publicBase64
    };
}

export const fetchKeys = async () => {

    const { powersync } = config;
    const base64Keys = {
        private: powersync.privateKey,
        public: powersync.publicKey
    };

    if (!base64Keys.private) {
        // Key is not present in ENV
        console.warn(
            `Private key has not been supplied in process.env.POWERSYNC_PRIVATE_KEY. A temporary key pair will be generated.`
        );
        const generated = await generateKeyPair();
        base64Keys.private = generated.privateBase64;
        base64Keys.public = generated.publicBase64;
    }

    const decodedPrivateKey = Buffer.from(base64Keys.private, 'base64');
    const powerSyncPrivateKey = JSON.parse(new TextDecoder().decode(decodedPrivateKey));
    keys.privateKey = {
        alg: powerSyncPrivateKey.alg,
        kid: powerSyncPrivateKey.kid,
        key: await importJWK(powerSyncPrivateKey)
    };

    const decodedPublicKey = Buffer.from(base64Keys.public, 'base64');
    keys.publicKey = JSON.parse(new TextDecoder().decode(decodedPublicKey));

    return keys;
}
