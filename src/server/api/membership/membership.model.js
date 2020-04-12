
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// represents a User's membership in a Group
export const MembershipSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId, 
    ref: 'Group', 
  }, 
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  }, 
  role: {
    type: String,
    enum: ['admin', 'member'], 
    required: true, 
  },
  // used for private groups that require acceptance
  /*verified: {

  },*/ 
});

/* Validations */


/* Middleware */

// creates Group's reference to Membership
MembershipSchema.pre('save', function(next) {
  mongoose.model('Group').findByIdAndUpdate(this.group, { $addToSet: { members: this._id }}, { new: true })
    .then(group => next())
    .catch(err => next(err))
})

// creates User's reference to Membership
MembershipSchema.pre('save', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.user, { $addToSet: { groups: this._id }}, { new: true })
    .then(user => next())
    .catch(err => next(err))
})

// deletes Group's reference to Membership
MembershipSchema.pre('remove', function(next) {
  mongoose.model('Group').findByIdAndUpdate(this.group, { $pull: { members: this._id }}, { new: true })
    .then(group => next())
    .catch(err => next(err))
})

// deletes User's reference to Membership
MembershipSchema.pre('remove', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.user, { $pull: { groups: this._id }}, { new: true })
    .then(user => next())
    .catch(err => next(err))
})

MembershipSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Membership', MembershipSchema);
