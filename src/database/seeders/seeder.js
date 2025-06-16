import { seedComments } from "./commentsSeeder.js";
import { seedLikes } from "./likesSeeder.js";

const mainSeedingFunction = async () => {
    console.log("Iniciando el proceso de seeding de comentarios...");

    const numLikes = 100; // Cambia este número según tus necesidades
    try {
        await seedLikes(numLikes);
        console.log("Seeding de likes completado exitosamente.");
    } catch (error) {
        console.error("Error durante el seeding de likes:", error.message);
    }
    const numComments = 50; // Cambia este número según tus necesidades
    try {
        await seedComments(numComments);
        console.log("Seeding de comentarios completado exitosamente.");
    } catch (error) {
        console.error("Error durante el seeding de comentarios:", error.message);
    }
};

mainSeedingFunction()
    .then(() => {
        console.log("Proceso de seeding finalizado.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error en el proceso de seeding:", error.message);
        process.exit(1);
    });