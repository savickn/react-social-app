'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UpvoteSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  /*upvoteable: { // used to specify object containing this Upvote if used via Reference
    type: Schema.Types.ObjectId,
    required: true
  }*/
}, { _id: false }); //having no '_id' helps prevent duplicate likes

export default mongoose.model('Upvote', UpvoteSchema);
