
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


  attending: { // can be true/false
    type: Boolean,
    required: true, 
  },
  waitlist: { // can be true/false
    type: Boolean,
    required: true, 
  },

});

/* Middleware */

// creates Event's reference to Invite
InviteSchema.pre('save', true, (next, done) => {
  mongoose.model('Event').findByIdAndUpdate(this.event, { invitees: { $addToSet: this._id }}, (err, event) => {
    if(err) return done(err);
    done()
  })
  next();
})

// creates User's reference to Invite
InviteSchema.pre('save', true, (next, done) => {
  mongoose.model('User').findByIdAndUpdate(this.user, { events: { $addToSet: this._id }}, (err, user) => {
    if(err) return done(err);
    done()
  })
  next();
})

// deletes Event's reference to Invite
InviteSchema.pre('remove', true, (next, done) => {
  mongoose.model('Group').findByIdAndUpdate(this.group, { invitees: { $pull: this._id }}, (err, event) => {
    if(err) return done(err);
    done()
  })
  next();
})

// deletes User's reference to Invite
InviteSchema.pre('remove', true, (next, done) => {
  mongoose.model('User').findByIdAndUpdate(this.user, { events: { $pull: this._id }}, (err, user) => {
    if(err) return done(err);
    done()
  })
  next();
})

InviteSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Invite', InviteSchema);
