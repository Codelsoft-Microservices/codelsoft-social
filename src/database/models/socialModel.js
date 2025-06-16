import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';

// Schema for comments
const commentSchema = new Schema({
    uuid: {
        type: String,
        immutable: true,
        default: () => uuidv4(),
        required: true,
    },
    videoUuid: {
        type: String,
        required: true,
    },
    userUuid: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { collection: 'Comments' });

// Schema for likes
const likeSchema = new Schema({
    uuid: {
        type: String,
        immutable: true,
        default: () => uuidv4(),
        required: true,
    },
    videoUuid: {
        type: String,
        required: true,
    },
    userUuid: {
        type: String,
        required: true,
    },
}, { collection: 'Likes' });

export const Comment = model('Comment', commentSchema);
export const Like = model('Like', likeSchema);
