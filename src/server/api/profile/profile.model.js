
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProfileSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    match: [/image\/(jpeg|jpg|png)/, "This file's format is incorrect."],
    required: true
  },
  size: {
    type: Number,
    max: 2000000, //2 MB
    required: true
  },
  path: { // path relative to public/static directory
    type: String,
    required: true
  },
  imageableType: {
    type: String, 
    required: true,
  },
  imageableId: {
    type: Schema.Types.ObjectId, 
    required: true, 
  }, 
});

/* Validations */



/* Middleware */

ProfileSchema.pre('save', (next) => {
  mongoose.model(this.imageableType).findByIdAndUpdate(this.imageableId, { $set: { displayPicture: this._id }}, (err, update) => {
    if(err) return next(err);
    next();
  })
})

ProfileSchema.pre('remove', (next) => {
  mongoose.model(this.imageableType).findByIdAndUpdate(this.imageableId, { $unset: { displayPicture: this._id }}, (err, r) => {
    if(err) return next(err);
    next();
  })
})


export default mongoose.model('Profile', ProfileSchema);
