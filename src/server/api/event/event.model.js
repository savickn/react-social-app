
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

  }],
  photos: [{

  }]*/
});

/* VIRTUALS */

// date field
EventSchema.virtual('date').get(function() {
  return this.startTime.getDay();
})

/* Middleware */



/* Methods */

EventSchema.statics = {

}

EventSchema.methods = {

}


export default mongoose.model('Event', EventSchema);


