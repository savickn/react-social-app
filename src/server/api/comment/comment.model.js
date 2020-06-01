import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { UpvoteSchema } from '../upvote/upvote.model';

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  upvotes: [UpvoteSchema],
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],

  parent: {
    type: Schema.Types.ObjectId,
    //ref: 'Commentable', ??? 
    required: true, 
  }, 
  parentType: {
    type: String,
    required: true, 
  }, 

  /*embeddedText: [String],
  customText: [String], */


}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

/*
* Validations
*/

// prevents multiple identical upvotes
CommentSchema
  .path('upvotes')
  .validate(function(upvotes) {
    const check = new Set(upvotes).size === upvotes.length;
    console.log('upvote check --> ', check);
    return check;
  }, 'You have already liked this review.')

// alternative implementation, NOT FINISHED
/*CommentSchema
  .path('upvotes')
  .validate(function(upvotes) {
    upvotes.forEach((upvote) => {
      if(upvote.author.equals()) {

      } 
    });
    return true;
  }, 'You have already liked this review.')*/


/*
* PRE/POST Hooks
*/

CommentSchema.pre('save', function(next) {
  mongoose.model(this.parentType)
    .findByIdAndUpdate(this.parent, { $pushToSet: { replies: this._id} })
    .then(() => next())
    .catch((err) => next(err)) 
})

/*
* Methods
*/

CommentSchema.methods = {

}

CommentSchema.statics = {

}

/*
* Virtuals
*/



export default mongoose.model('Comment', CommentSchema);
