import { Comment, Like } from "../database/models/socialModel.js";
import { status } from "@grpc/grpc-js";
import catchAsync from "../utils/catchAsync.js";
import { v4 as uuidv4 } from "uuid";

const SocialCheck = catchAsync(async (call, callback) => {
return callback(null, { status: "ok" });
});     

const GiveLike = catchAsync(async (call, callback) => {
    return callback(null, { status: "ok" });
});

const LeaveComment = catchAsync(async (call, callback) => {
    return callback(null, { status: "ok" });
});

const GetCommentsAndLikes = catchAsync(async (call, callback) => {
    return callback(null, { status: "ok" });
});

export default {
    SocialCheck,
    GiveLike,
    LeaveComment,
    GetCommentsAndLikes,
};