import { Comment, Like } from "../database/models/socialModel.js";
import { status } from "@grpc/grpc-js";
import catchAsync from "../utils/catchAsync.js";
import { v4 as uuidv4 } from "uuid";

const SocialCheck = catchAsync(async (call, callback) => {
    return callback(null, {
        message: "El servicio de videos está funcionando",
    });
});     

const GiveLike = catchAsync(async (call, callback) => {
    const { videoUuid, userUuid } = call.request;

    if (!videoUuid || !userUuid) {
        return callback({
            code: status.INVALID_ARGUMENT,
            message: "El UUID del video y el UUID del usuario son requeridos",
        });
    }

    const like = await Like.create({
        uuid: uuidv4(),
        videoUuid,
        userUuid,
    });

    // Aquí podrías publicar un evento a RabbitMQ si es necesario
    // import publishVideoLikeEvent from "../queue/producers/likesProducers.js";
    // await publishVideoLikeEvent({ videoId: videoUuid, userId: userUuid });

    return callback(null, {
        message: "Like registrado correctamente",
    });
});

const LeaveComment = catchAsync(async (call, callback) => {
    const { videoUuid, userUuid, comment } = call.request;

    if (!comment || comment.trim() === "") {
        return callback({
            code: status.INVALID_ARGUMENT,
            message: "El comentario no puede estar vacío",
        });
    }

    const com = await Comment.create({
        uuid: uuidv4(),
        videoUuid,
        userUuid,
        comment,
    });

    return callback(null, {
        message: "Comentario registrado correctamente",
        comment: {
            uuid: com.uuid,
            videoUuid: com.videoUuid,
            userUuid: com.userUuid,
            comment: com.comment,
            createdAt: com.createdAt,
        },
    });
});

const GetCommentsAndLikes = catchAsync(async (call, callback) => {
    const { videoUuid } = call.request;

    if (!videoUuid) {
        return callback({
            code: status.INVALID_ARGUMENT,
            message: "El UUID del video es requerido",
        });
    }

    const comments = await Comment.find({ videoUuid });
    const likesCount = await Like.countDocuments({ videoUuid });
    if (likesCount === null) {
        return callback({
            code: status.INTERNAL,
            message: "Error al contar los likes",
        });
    }
    if (!comments || comments.length === 0) {
        return callback(null, {
            message: "No se encontraron comentarios para este video",
            likes: likesCount,
            comments: [],
        });
    }
    return callback(null, {
        message: "Comentarios y likes obtenidos correctamente",
        likes: likesCount,
        comments,
    });
});

export default {
    SocialCheck,
    GiveLike,
    LeaveComment,
    GetCommentsAndLikes,
};