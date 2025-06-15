import { getChannel } from "../config/connection.js";

const QUEUE_NAME = "video-liked-queue";

const publishVideoLikeEvent = async (likeData) => {
  try {
    const channel = await getChannel();
    const msgBuffer = Buffer.from(JSON.stringify(likeData));

    await channel.sendToQueue(QUEUE_NAME, msgBuffer, { persistent: true });
    console.log(`Like event published for video: ${likeData.videoId} by user: ${likeData.userId}`);
  } catch (error) {
    console.error('Failed to publish video like event:', error.message);
    throw error;
  }
};

export default publishVideoLikeEvent;