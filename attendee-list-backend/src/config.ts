import 'dotenv/config';

const config = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 6060,
    database: {
        type: process.env.DATABASE_TYPE || 'postgres',
        uri: process.env.DATABASE_URI ? process.env.DATABASE_URI : '',
        database: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : '',
    },
    powersync: {
        url: process.env.POWERSYNC_URL ? process.env.POWERSYNC_URL : '',
        publicKey: process.env.POWERSYNC_PUBLIC_KEY ? process.env.POWERSYNC_PUBLIC_KEY : '',
        privateKey: process.env.POWERSYNC_PRIVATE_KEY ? process.env.POWERSYNC_PRIVATE_KEY : '',
        jwtIssuer: process.env.JWT_ISSUER ? process.env.JWT_ISSUER : '',
    }
};

export default config;
