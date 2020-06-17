
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

  geoJSON: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    }, 
    location: { // e.g. CN Tower, 1983 Kipling Avenue
      type: String,
      required: true, 
    },
  },

  /*location: { // should maybe be an embedded document
    type: String,
    required: true,
  },*/
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

  /* REFERENCES */
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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  
  /* ATTENDANCE */
  // type --> e.g. Open

  slots: { // represents the total number of people that can attend the event
    type: Number, 
    default: 9999, 
  }, 
  inviteOnly: {
    type: Boolean,
    default: false, 
  }, 
  invites: [{ // represents attendence
    type: Schema.Types.ObjectId,
    ref: 'Invite'
  }],

  /* IMAGES */
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

/*
EventSchema
  .path('attendees')
  .validate((attendees) => {
    let setSize = new Set(attendees.map(a => a.toString())).size;
    let arrSize = attendees.length;
    //console.log('set --> ', set, '\n arr --> ', arr);
    return setSize === arrSize;
  }, 'You are already attending this event!')
*/


/* Middleware */





/* Methods */

EventSchema.statics = {

}

EventSchema.methods = {

}


export default mongoose.model('Event', EventSchema);


