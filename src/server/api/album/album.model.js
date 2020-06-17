import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const permissionStates = [
  "Owner",
  "All",
  "Selected",
];

export const AlbumSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: { // not mandatory
    type: String, 
  },
  profile: { // the Profile picture of the Album
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  }, 
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: 'Picture', 
  }], 
  // used to decide who can view/add to/remove from the album
  permissions: {
    type: String,
    enum: permissionStates,
    default: "Owner"
  },
  // used to specify users with special permissions
  permissible: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  imageableType: { // parent (e.g. Group/User/Event)
    type: String,
    required: true
  },  
  imageableId: {
  	type: Schema.Types.ObjectId,
    required: true
  }, 
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', },
});

/*
* Validations
*/


/*
* PRE/POST Hooks
*/

// data consistency
// used to create Album reference in ImageableType object
AlbumSchema.pre('save', function(next) {
  mongoose.model(this.imageableType)
    .findByIdAndUpdate(this.imageableId, { $push: { albums: this._id } })
    .then(res => next())
    .catch(err => next(err))
})

// data consistency 
// used to remove Album reference in ImageableType object
AlbumSchema.pre('remove', function(next) {
  mongoose.model(this.imageableType)
    .findByIdAndUpdate(this.imageableId, { $pull: { albums: this._id } })
    .then(res => next())
    .catch(err => next(err))
})

/*
// data consistency by removing Picture if Album is deleted
// NOTE: add validation to ensure User has permission to delete the Album
AlbumSchema.pre('remove', function(next, done) {
  mongoose.model('Picture')
    .deleteMany({_id: { $in: this.pictures }})
    .exec(function(err, res) {
      if(err) return done(err);
      done();
    });
});*/



/*
* Methods
*/

AlbumSchema.methods = {

}

AlbumSchema.statics = {

}

/*
* Virtuals
*/



AlbumSchema.set('toJSON', {virtuals: true});

export default mongoose.model('Album', AlbumSchema);
