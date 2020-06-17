import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { UpvoteSchema } from '../upvote/upvote.model';
import Upvote from '../upvote/upvote.model';

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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  upvotes: [UpvoteSchema],

  parent: {
    type: Schema.Types.ObjectId,
    //ref: 'Commentable', ??? 
    required: true, 
  }, 
  parentType: {
    type: String,
    required: true, 
  }, 

  /*
  embeddedText: [String],
  customText: [String], 
  */


}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

/*
* Validations
*/

// prevents multiple identical upvotes... NOT WORKING
CommentSchema
  .path('upvotes')
  .validate(function(upvotes) {
    const check = new Set(upvotes.map(uv => uv.author)).size === upvotes.length;
    console.log('upvote check --> ', check);
    return check;
  }, 'You have already liked this review.')

/*
* PRE/POST Hooks
*/

CommentSchema.pre('save', function(next) {
  mongoose.model(this.parentType)
    .findByIdAndUpdate(this.parent, { $addToSet: { comments: this._id} })
    .then(() => next())
    .catch((err) => next(err)) 
})

/* METHODS */


CommentSchema.methods = {
  // lol but it works
  toggleUpvote: function(userId) {
    console.log('toggleUpvote this --> ', this);
    const authors = this.upvotes.map(upvote => upvote.author);
    console.log('authors --> ', authors);

    const matches = authors.filter(a => {
      console.log('a.string --> ', a.toString());
      console.log('userid.string --> ', userId.toString());
      return a.toString() == userId.toString();
    });
    console.log('matches --> ', matches);

    if(matches.length > 0) {
      console.log('removing upvote');
      this.upvotes.splice(authors.indexOf(userId), 1);
    } else {
      console.log('adding upvote');
      const u = new Upvote({ author: userId });
      console.log('upvote --> ', u);
      this.upvotes.push(u);
    }
    console.log('after filter --> ', this);
  }
}


/*
* Virtuals
*/

CommentSchema
  .virtual('score')
  .get(function() {
    return this.upvotes.length;
  })

CommentSchema.set('toJSON',  { virtuals: true });


export default mongoose.model('Comment', CommentSchema);



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

