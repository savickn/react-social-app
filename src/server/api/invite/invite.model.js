
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// represents a User's attendence status for an Event
export const InviteSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId, 
    ref: 'Event', 
  }, 
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  }, 
  issueType: { // used to track whether this is an Invite (issued via Admin) or Request (issued via User)
    type: String,
    enum: ['Admin', 'User'],
    required: true, 
  },

  accepted: { // used to track whether the User has accepted the Invite (if issued by Admin)
    type: Boolean,
    required: true, 
  },
  verified: { // used to track whether an Admin has accepted the request (if issued by User)
    type: Boolean, 
    required: true,  
  },

  attending: { // tracks who is Attending or Not Attending
    type: Boolean,
    default: false, 
  },
  waitlist: { // tracks who is on the Waitlist
    type: Boolean,
    default: false,  
  },
  notAttending: {
    type: Boolean, 
    default: false, 
  }, 
});

/* Validations */


/* use to check that user isnt attending event multiple times
InviteSchema
  .path('event')
  .validate((eventId) => {

  })
*/


/* Middleware */

// creates Event's reference to track which Users are attending said Event
// NOT WORKING... cuz each new Invite always has a unique _ID... must test 'user' and 'event' fields
InviteSchema.pre('save', true, function(next, done) {
  mongoose.model('Event').findByIdAndUpdate(this.event, { $addToSet: { invites: this._id }})
    .then(r => done())
    .catch(err => done(err))
  next();
})

// creates User's reference to track which Events the User is attending
// NOT WORKING... cuz each new Invite always has a unique _ID... must test 'user' and 'event' fields
InviteSchema.pre('save', true, function(next, done) {
  mongoose.model('User').findByIdAndUpdate(this.user, { $addToSet: { events: this._id }})
    .then(r => done())
    .catch(err => done(err))
  next();
})



// deletes User's reference to Invite
InviteSchema.pre('remove', true, function(next, done) {
  mongoose.model('User').findByIdAndUpdate(this.user, { pull: { events: this._id }}, (err, user) => {
    if(err) return done(err);
    done()
  })
  next();
})


/* Virtuals */



InviteSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Invite', InviteSchema);
