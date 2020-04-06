
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: { // should maybe be an embedded document
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  slots: { // represents the total number of people that can attend the event
    type: Number, 
    default: 9999, 
  }, 
  inviteOnly: {
    type: Boolean,
    default: false, 
  }, 
  
  /* MODEL RELATIONSHIPS */
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  notGoing: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  waitlist: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },

  /* EXTRA FEATURES */
  /*comments: [{

  }],*/
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile', 
  }, 
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album', 
  }], 
});

/* VIRTUALS */

// date field
EventSchema.virtual('date').get(function() {
  return this.startTime.getDay();
})


/* Validations */

// do not allow a User to attend twice
// WORKING, but could potential fail if the duplicate already exists
EventSchema
  .path('attendees')
  .validate((attendees) => {
    let setSize = new Set(attendees.map(a => a.toString())).size;
    let arrSize = attendees.length;
    //console.log('set --> ', set, '\n arr --> ', arr);
    return setSize === arrSize;
  }, 'You are already attending this event!')





/* Middleware */





/* Methods */

EventSchema.statics = {

}

EventSchema.methods = {

}


export default mongoose.model('Event', EventSchema);


