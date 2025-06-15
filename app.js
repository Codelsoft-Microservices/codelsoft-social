import { config } from "dotenv";
import { ServerCredentials, Server } from "@grpc/grpc-js";
import { loadProto } from "./src/utils/loadProto.js";
import socialService from "./src/services/socialService.js";
import { connectMongoose } from "./src/database/connect.js";
import { connectToRabbitMQ } from "./src/queue/config/connection.js";

config({ path: "./.env" });

const server = new Server();

await connectMongoose()
    .then(() => {
        console.log("✓ Conexión a base de datos exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1);
    });

// conectar rabbitmq
await connectToRabbitMQ()
    .then(() => {
        console.log("✓ Conexión a RabbitMQ exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a RabbitMQ:", error.message);
        process.exit(1);
    });

const socialProto = loadProto("social");
server.addService(socialProto.SocialInteractions.service, socialService);

server.bindAsync(
    `${process.env.SERVER_URL}:${process.env.PORT}`,
    ServerCredentials.createInsecure(),
    (error, port) => {
        if (error) {
            console.error(`Error al iniciar el servidor: ${error.message}`);
            return;
        } else {
            console.log(`- Entorno:     ${process.env.NODE_ENV}`);
            console.log(`- Puerto:      ${port}`);
            console.log(`- URL:         ${process.env.SERVER_URL}:${port}`);
        }
    }
);