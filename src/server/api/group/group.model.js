import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: { // e.g. city/country, to filter search results
    type: String,
    required: true,
  },
  category: [{ // for search, e.g. Dining/Athletics/etc
    type: String,
  }],
  inviteOnly: {
    type: Boolean,
    default: false,
  },
  autoAcceptJoinRequests: {
    type: Boolean,
    default: true,
  },
  hidden: { // ???
    type: Boolean,
    default: false,
  },
  requirements: [{ // criteria to join a group when using AutoJoin, e.g. must have display picture
    type: String,
  }],

  /* model relationships */
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }, 
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album',
  }],
  /*admins: [{ // specifies which users have higher-level permissions in this group
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],*/
  /*admins: [{
    type: Schema.Types.ObjectId, 
    ref: 'Membership', 
  }], */
  members: [{
    type: Schema.Types.ObjectId, 
    ref: 'Membership', 
  }], 


  /*requests: [{ // pending requests to join group
    
  }],*/
  reviews: [],
});

/*
* Validations
*/

// should add validations for users before adding them to group (e.g. must have profile picture)
GroupSchema
  .path('members')
  .validate(function() {
    return;
  })


/*
* PRE/POST Hooks
*/

// used to create default Album called DisplayPictures if not exists
/*GroupSchema.pre('save', function(next) {
  console.log('group save --> ', this);
  next();
}); */

// used to update 'User.groups' field
/*GroupSchema.pre('findOneAndUpdate', function(next) {
  const { _id, members } = this._update;
  console.log('group update --> ', this);
  mongoose.model('Group').findOneById(_id, (err, group) => {
    if(err) return next(err);
    let difference = [].filter(x => );
    let userId = difference[0];
    mongoose.model('User', )

    return next();
  })
});*/

/*
* Methods
*/

GroupSchema.methods = {
  join: function(userId) {
    return; //mongoose.model('Group')
  },


  isAdmin: function(userId) {
    return this.admins.includes(userId) ? true : false;
  },
  isMember: function(userId) {
    return this.members.includes(userId) ? true : false;
  }
}

GroupSchema.statics = {
  getAdminsByGroup: function(groupId) {
    return this.findById(groupId).populate('admins').exec();
  },
}

/*
* Virtuals
*/

function interpolateDistance(d1, d2) {
  return;
}

GroupSchema.virtual('rating').get(function() {
  return;
})

GroupSchema.virtual('memberCount').get(function() {
  return this.members ? this.members.length : '';
})

GroupSchema.virtual('distance').get(function(myLocation) {
  return interpolateDistance(myLocation, this.location);
})


GroupSchema.set('toJSON', {virtuals: true});

export default mongoose.model('Group', GroupSchema);
