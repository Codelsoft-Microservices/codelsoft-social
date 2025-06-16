import { Video } from "../../database/models/videoModel.js";
import { getChannel } from "../config/connection.js";

const QUEUE_NAME = "video-create-queue";

const videoCreate = async () => {
    try {
        const channel = await getChannel();
        if (!channel) {
            throw new Error("Channel is not available");
        }

        // Declare the queue first to ensure it exists
        console.log(`Asserting queue: ${QUEUE_NAME}`);
        await channel.assertQueue(QUEUE_NAME, { 
            durable: true,
            // If queue doesn't exist yet, create it
            autoDelete: false 
        });
        
        console.log(`Started consuming from ${QUEUE_NAME}`);

        channel.consume(QUEUE_NAME, async (data) => {
            if (!data) {
                console.warn("Received null message from queue");
                return;
            }
            
            try {
                const content = JSON.parse(data.content.toString());
                console.log("Consuming video-create-queue", content);
                
                await Video.create(content);
                channel.ack(data);
                console.log("Video created successfully:", content);
            } catch (error) {
                console.error("Error processing message:", error.message);
                // Don't requeue if it's a parsing error
                channel.nack(data, false, false);
            }
        });
        
        console.log(`Consumer setup complete for queue: ${QUEUE_NAME}`);
    } catch (error) {
        console.error(`Error setting up video consumer: ${error.message}`);
        // Instead of exiting, let's retry after a delay
        console.log("Retrying in 5 seconds...");
        setTimeout(() => videoCreate(), 5000);
    }
}

export default videoCreate;