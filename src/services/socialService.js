import { Social } from "../database/models/socialModel.js";
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

    const social = await Social.create({
        uuid: uuidv4(),
        videoUuid,
        userUuid,
        comment,
    });

    return callback(null, {
        message: "Comentario registrado correctamente",
        social,
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

    const comments = await Social.find({ videoUuid });

    return callback(null, {
        message: "Comentarios y likes obtenidos correctamente",
        likes: 0,
        comments,
    });
});

export default {
    SocialCheck,
    GiveLike,
    LeaveComment,
    GetCommentsAndLikes,
};