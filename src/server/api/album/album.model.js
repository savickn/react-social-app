import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const permissionStates = [
  "Owner",
  "All",
  "Selected",
];

export const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: Schema.Types.ObjectId,
    ref: 'Picture',
  }, 
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: 'Picture', 
  }],
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  // contains CollectionName (e.g. Group/User) of object that owns this Album
  imageableType: { 
    type: String,
    required: true
  },
  // contains ObjectId of object that owns this image
  imageableId: {
  	type: Schema.Types.ObjectId,
    required: true
  }
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
  console.log('album pre-save --> ', this);
  mongoose.model(this.imageableType)
    .findByIdAndUpdate(this.imageableId, { $push: { albums: this._id } }, function(err, res) {
      if(err) return next(err);
      next();
    });
})


// data consistency 
// used to remove Album reference in ImageableType object
AlbumSchema.pre('remove', function(next) {
  console.log('album pre-remove --> ', this);
  mongoose.model(this.imageableType)
    .findByIdAndUpdate(this.imageableId, { $pull: { albums: this._id } }, function(err, res) {
      if(err) return next(err);
      next();
    })
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
