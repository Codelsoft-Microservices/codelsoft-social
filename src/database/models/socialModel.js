import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';

const socialSchema = new Schema({
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
    }
}, { collection: 'Social' });

export const Social = model('Social', socialSchema);
