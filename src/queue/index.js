import videoCreate from "./consumers/videosConsumers.js";

const initializeQueueConsumers = async () => {
    await videoCreate();
    console.log("Queue consumers initialized successfully.");
};

export default initializeQueueConsumers;