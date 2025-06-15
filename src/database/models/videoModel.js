import { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, { collection: 'Videos' });

export const Video = model('Video', videoSchema);
