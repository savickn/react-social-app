import mongoose from 'mongoose';
import Comment from '../comment/comment.model';
const Schema = mongoose.Schema;

const SocialSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: { //can also have pictures/etc
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  status: { //for RSVPs, e.g. closed, full, open
    type: String,
    default: 'Open',
    enum: ['Open', 'Full', 'Closed']
  },
  maxAttendees: {
    type: Number,
    required: true
  },

  //model relationships
  going: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  waiting: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  notGoing: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  invited: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  //comments: [Comment],
  reviews: [],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },

  //server-side housekeeping
  slug: {
    type: String,
    required: true
  },
  cuid: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
});

/*
* Validations
*/

SocialSchema
  .path('date')
  .validate(function() {
    return this.date > Date.now();
  })

SocialSchema
  .path('going')
  .validate(function() {
    // below wont work cuz need to add overfill to 'waiting' array
    //return this.going.length < this.maxAttendees
  })

/*
* PRE/POST Hooks
*/



/*
* Methods
*/

SocialSchema.methods = {

}

SocialSchema.statics = {

}

/*
* Virtuals
*/

SocialSchema.virtual('goingCount').get(function() {
  return this.going.length;
});

SocialSchema.virtual('spotsRemaining').get(function() {
  return this.maxAttendees - this.going.length;
});


SocialSchema.set('toJSON', {virtuals: true});

export default mongoose.model('Social', SocialSchema);
