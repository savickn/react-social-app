
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// represents a Profile picture
export const ProfileSchema = new Schema({
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Picture', 
    //required: true,
  }, 
  imageableType: { //parentType
    type: String, 
    required: true,
  },
  imageableId: { //parentId
    type: Schema.Types.ObjectId, 
    required: true, 
  }, 
});

/* Middleware */

// data consistency... update Profile field of ImageableType (e.g. User, Group, Event)
ProfileSchema.pre('save', function(next) {
  mongoose.model(this.imageableType)
    .findByIdAndUpdate(this.imageableId, { $set: { profile: this._id }})
    .then(res => next())
    .catch(err => {
      console.log('Profile pre-save err --> ', err);
      next(err)
    })
})

// data consistency... update Profile field of ImageableType (e.g. User, Group, Event)
ProfileSchema.pre('remove', function(next) {
  mongoose.model(this.imageableType)
    .findByIdAndUpdate(this.imageableId, { $unset: { profile: this._id }})
    .then(res => next())
    .catch(err => next(err))
})


export default mongoose.model('Profile', ProfileSchema);
