'use strict';

import path from 'path';
import _ from 'lodash';
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import mongoose from 'mongoose';

import config from '../../config/environment';
import Picture from './picture.model';


/*
Should only have:
createPicture
deletePicture
*/

// save file to local drive
function saveToDisk() {

}



// used to upload multiple pictures in the same operation
/* export const batchCreateLocal = async (req, res) => {
  if(!req.body.albumId) return handleError(res, 'Must provide imageableType and imageableId');
  const albumId = req.body.albumId;

  const destination = path.resolve(config.root, 'src/server/public', imageableType, imageableId);
  console.log('\n destination --> ', destination);
  console.log('\n createLocal req.files --> ', req.files);
  console.log('\n req.body --> ', req.body);
  
  // represents newly created pictures
  let pictures = [];
  
  for(let file of Object.values(req.files)) {
    console.log('file --> ', file);
    let err = await mkdirp(destination);
    if(err) return handleError(err);
    err = await file.mv(path.resolve(destination, file.name));
    if(err) return handleError(err);

    let body = {
      filename: file.name, 
      size: file.data.length, 
      contentType: file.mimetype,
      path: destination, //path.resolve(imageableType, imageableId, file.name),
      album: albumId, 
    };
    Picture.create(body, function(err, picture) {
      if(err) return handleError(res, err);

      const pictureObj = {
        _id: picture._id,
        contentType: picture.contentType,
        path: picture.path
      };
      
      pictures.push(picture);
    });
  };

  // somehow return after all pictures are created
} */

/* Only saves image to disk (does not create database entry)
* used for embedded documents
*/
export const saveImageToDisk = (req, res) => {
  console.log('req.file --> ', req.file);
  return res.status(201).send('Image Saved To Disk');
  
  /*const destination = path.resolve(config.root, 'src/server/public/misc');
  console.log('\n destination --> ', destination);
  console.log('\n createLocal req.files --> ', req.files);
  console.log('\n req.body --> ', req.body);
  
  let file = req.files[0];
  console.log('file --> ', file);
    
  mkdirp(destination, (err) => {
    if(err) return handleError(res, err);
    file.mv(path.resolve(destination, file.name), (err) => {
      if(err) return handleError(res, err);
      
    });
  });*/
}

/* used to add Profile pic to database resource 
* resourceName (e.g. User), resourceId, req.file
*/
export const createProfile = (req, res) => {
  console.log('createProfile req.file --> ', req.file);
  console.log('createProfile req.body --> ', req.body);
  const pic = [new Picture(req.file)];
  mongoose.model(req.body.resourceName)
    .findByIdAndUpdate(req.body.resourceId, { $set: { displayPicture: pic }}, (err, r) => {
      if(err) return res.status(500).send(err);
      return res.status(200).send('Profile Updated!');
    })
}


/* Creates a DB entry for a Picture and saves the image file locally, WORKING
* must provide 'albumId' in the request body
* can also save binary data of image to DB using 'fs.readFileSync(path)' to read file
*/
export const createLocal = (req, res) => {
  if(!req.body.albumId) return handleError(res, 'Must provide albumId');
  const albumId = req.body.albumId;

  const destination = path.resolve(config.root, 'src/server/public/Albums', albumId);
  console.log('\n destination --> ', destination);
  console.log('\n createLocal req.files --> ', req.files);
  console.log('\n req.body --> ', req.body);
  
  let file = req.files[0];
  console.log('file --> ', file);
    
  mkdirp(destination, (err) => {
    if(err) return handleError(res, err);
    file.mv(path.resolve(destination, file.name), (err) => {
      if(err) return handleError(res, err);
      let body = {
        filename: file.name, 
        size: file.data.length, 
        contentType: file.mimetype,
        path: path.join('/Albums', albumId, file.name), // or destination??
        album: albumId, 
      };
      console.log('picture obj --> ', body);
      Picture.create(body, function(err, picture) {
        if(err) return handleError(res, err);
  
        const pictureObj = {
          _id: picture._id,
          contentType: picture.contentType,
          path: picture.path
        };
        
        return res.status(201).json({picture});
      });
    });
  });
};

/*
let rstream = fs.createReadStream(path)
      .pipe(fs.createWriteStream(`${destination}/${file.name}`));

    rstream.on('finish', function () {
      var body = {filename: req.body.filename, product: req.body.product,
        displayPicture: req.body.displayPicture, size: req.body.size, contentType: req.body.contentType,
        path: productType + '/' + req.body.filename}; //can also save binary data with 'image: image'
      Picture.create(body, function(err, picture) {
        if(err) { return res.status(500).send(err); }

        var pictureObj = {};
        pictureObj._id = picture._id;
        pictureObj.contentType = picture.contentType;
        pictureObj.path = picture.path;
        //res.contentType(picture.contentType);
        return res.status(201).json(pictureObj);
      });
    });
    */



// create Picture entry... WORKING
export function createPicture(req, res) {
  const { parentId, parentType } = req.body;

  if(!parentId || !parentType) {
    return res.status(500).send('Invalid Arguments!');
  }

  const destination = path.resolve(config.root, `src/server/public/${parentType}s/${parentId}`);
  console.log('\n destination --> ', destination);
  console.log('\n createLocal req.files --> ', req.files);
  console.log('\n req.body --> ', req.body);
  
  let file = req.files.avatar;
  console.log('file --> ', file);
    
  mkdirp(destination, (err) => {
    if(err) return handleError(res, err);
    file.mv(path.resolve(destination, file.name), (err) => {
      if(err) return handleError(res, err);
      let body = {
        filename: file.name, 
        size: file.data.length, 
        contentType: file.mimetype,
        path: path.join(`/${parentType}s/${parentId}`, file.name), // or destination??
        parentId,
        parentType, 
      };
      console.log('picture obj --> ', body);
      Picture.create(body, function(err, picture) {
        if(err) return handleError(res, err);
  
        const pictureObj = {
          _id: picture._id,
          contentType: picture.contentType,
          path: picture.path
        };
        
        return res.status(201).json({ picture });
      });
    });
  });
}


// Get a single picture
export function getPicture(req, res) {
  Picture.findById(req.params.id, '_id contentType path', function (err, picture) {
    if(err) return handleError(res, err);
    if(!picture) return res.status(404).send('Not Found');

    res.contentType(picture.contentType);
    return res.json(picture);
  });
};

// Deletes a picture from the DB, WORKING
export function deletePicture(req, res) {
  Picture.findByIdAndRemove(req.params.id, function (err, picture) {
    if(err) return handleError(res, err);
    fs.unlinkSync('server/public/' + picture.path);
    return res.status(204).send('No Content');
  });
};


function handleError(res, err) {
  console.log('err --> ', err);
  return res.status(500).send(err);
}









/*
var writeDir = `${destination}/${req.body.filename}.${req.body.ext}`;

  mkdirp(destination, function(err) {
    var rstream = fs.createReadStream(path)
      .pipe(fs.createWriteStream(writeDir));

    rstream.on('finish', function () {
      var body = {filename: req.body.filename, ext: req.body.ext, product: req.body.product,
        displayPicture: req.body.displayPicture, size: req.body.size, contentType: req.body.contentType,
        path: productType + '/' + req.body.filename}; //can also save binary data with 'image: image'
      Picture.create(body, function(err, picture) {
        if(err) { return handleError(res, err); }
        console.log('create picture', picture);
        gm(writeDir)
          .resize('96', '96', '^')
          //.gravity('Center')
          //.crop('96', '96')
          .write(`${destination}/${req.body.filename}-thumb.${req.body.ext}`, function (err) {
            if(err) console.log(err);
          });
        gm(writeDir)
          .resize('192', '192', '^')
          .write(`${destination}/${req.body.filename}-thumb-hi.${req.body.ext}`, function (err) {
            if(err) console.log(err);
          });
        gm(writeDir)
          .resize('320', '240', '^')
          .write(`${destination}/${req.body.filename}-lo.${req.body.ext}`, function (err) {
            if(err) console.log(err);
          });
        gm(writeDir)
          .resize('640', '480', '^')
          .write(`${destination}/${req.body.filename}-med.${req.body.ext}`, function (err) {
            if(err) console.log(err);
          });
        gm(writeDir)
          .resize('1024', '768', '^')
          .write(`${destination}/${req.body.filename}-hi.${req.body.ext}`, function (err) {
            if(err) console.log(err);
          });
        return res.status(201).json(picture);
      });
    });
  });
  */