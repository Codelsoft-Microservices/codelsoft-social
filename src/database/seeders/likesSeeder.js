import { generateFakeLikes } from "../fakers/likesFaker.js";
import { Like } from "../models/socialModel.js";
import { connectMongoose } from "../connect.js";

await connectMongoose();

const seedLikes = async (numLikes) => {
    const likes = [];
    for (let i = 0; i < numLikes; i++) {
        likes.push(generateFakeLikes());
    }
    
    try {
        await Like.insertMany(likes);
        console.log(`✓ ${numLikes} likes generados exitosamente`);
    } catch (error) {
        console.error("Error al generar los likes:", error.message);
    }
}

export { seedLikes };