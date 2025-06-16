import { generateFakeComments } from "../fakers/commentsFaker.js";
import { Comment } from "../models/socialModel.js";
import { connectMongoose } from "../connect.js";

await connectMongoose()

const seedComments = async (numComments) => {
    const comments = [];
    for (let i = 0; i < numComments; i++) {
        comments.push(generateFakeComments());
    }

    try {
        await Comment.insertMany(comments);
        console.log(`✓ ${numComments} comentarios generados exitosamente`);
    } catch (error) {
        console.error("Error al generar los comentarios:", error.message);
    }

}

export { seedComments}