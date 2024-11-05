import Server from "./Server";
import config from "./config";

// Initialize and invoke the server
(async () => {
    const server = new Server({
        port: config.port
    });
    await server.start();
})();
