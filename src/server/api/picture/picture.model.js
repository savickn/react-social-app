'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs-extra');

// represents a single Image
export const PictureSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    match: [/image\/(jpeg|jpg|png|webp)/, "This file's format is incorrect."],
    required: true
  },
  size: {
    type: Number,
    max: 2000000, //2 MB
    required: true
  },
  path: { // relative path
    type: String,
    required: true
  },
  
  /* relationships */
  parentType: { // e.g. Album or Profile
    type: String,
    required: true, 
  },
  parentId: {
    type: Schema.Types.ObjectId,
    required: true, 
  }, 
});

/**
** VALIDATIONS
**/



/**
** PRE && POST HOOKS
**/

// data consistency by adding Picture to Album when created
// NOTE: should add validation to check that User has proper permissions to add Picture to Album
PictureSchema.pre('save', function(next) {
  
  console.log('pre-save picture this --> ', this);

  let updateObj = {};

  switch(this.parentType) {
    case 'Profile':
      updateObj = { $set: { image: this._id } };
      break;
    case 'Album':
      updateObj = { $push: { pictures: this._id } };
      break;
    default: 
      return next(false);
  }

  console.log('updateObj --> ', updateObj);

  mongoose.model(this.parentType)
    .findByIdAndUpdate(this.parentId, updateObj)
    .then(updated => next())
    .catch(err => next(err));
});

// data consistency by removing Picture from Album when deleted
PictureSchema.pre('remove', function(next) {

  let updateObj = {};

  switch(this.parentType) {
    case 'Profile':
      updateObj = { $unset: { image: this._id } };
      break;
    case 'Album':
      updateObj = { $pop: { pictures: this._id } };
      break;
    default: 
      return next(false);
  }

  mongoose.model(this.parentType)
    .findByIdAndUpdate(this.parentId, updateObj)
    .then(updated => next())
    .catch(err => next(err));
});

/* VIRTUALS */

// can use virtual to provide either Server-Path or S3-Path (or just use webpack)

export default mongoose.model('Picture', PictureSchema);



/* OLD */

// data consistency
/*PictureSchema.pre('save', function(next) {
  console.log('pictureCreate this --> ', this);
  mongoose.model(this.imageableType)
    .update({'_id': this.imageableId}, { $push: {pictures: this._id} })
    .exec(function(err, res) {
      console.log('pre-save dataConsistency --> ', err, res);
      if(err) return next(err);
      next();
    });
});*/

// sets 'displayPicture' field of imageableType if 'displayPicture: true'
/*PictureSchema.pre('save', function(next) {
  console.log('pictureCreate this --> ', this);
  if(this.displayPicture) {
    mongoose.model(this.imageableType)
      .update({'_id': this.imageableId}, {$set: {displayPicture: this._id}})
      .exec(function(err, res) {
        console.log('pre-save displayPicture --> ', err, res);
        if(err) return next(err);
        next();
      });
  } else {
    next();
  }
});*/

// data consistency by removing Picture from Product when deleted
/*PictureSchema.pre('remove', function(next) {
  console.log('pictureRemove this --> ', this);
  mongoose.model(this.imageableType)
    .update({'_id': this.imageableId}, {$pop: {pictures: this._id}})
    .exec(function(err, res) {
      console.log('pre-remove dataConsistency --> ', err, res);
      if(err) return next(err);
      next();
    });
});*/