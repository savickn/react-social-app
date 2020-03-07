
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
});

/* Middleware */

// creates Group's reference to Membership
MembershipSchema.pre('save', function(next) {
  console.log('addmembership pre-save --> ', this);
  mongoose.model('Group').findByIdAndUpdate(this.group, { $addToSet: { members: this._id }}, (err, group) => {
    if(err) return next(err);
    next();
  });
})

// creates User's reference to Membership
MembershipSchema.pre('save', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.user, { $addToSet: { groups: this._id }}, (err, user) => {
    if(err) return next(err);
    next();
  })
})

// deletes Group's reference to Membership
MembershipSchema.pre('remove', (next) => {
  mongoose.model('Group').findByIdAndUpdate(this.group, { $pull: { members: this._id }}, (err, group) => {
    if(err) return next(err);
    next();
  })
})

// deletes User's reference to Membership
MembershipSchema.pre('remove', (next) => {
  mongoose.model('User').findByIdAndUpdate(this.user, { $pull: { groups: this._id }}, (err, user) => {
    if(err) return next(err);
    next();
  })
})

MembershipSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Membership', MembershipSchema);
