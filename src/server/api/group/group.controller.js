
/* contains endpoints reachable via public API */

import Group from './group.model';
import Album from '../album/album.model';
import User from '../user/user.model';

import * as util from './groups.util';
const handleError = util.handleError;

/* SEARCH GROUPS */

export const searchGroups = (req, res) => {
  console.log('req.query --> ', req.query);
  const { searchString } = req.query;
  let query = {};

  const coords = JSON.parse(req.query.coords);

  //const location = req.query.location;
  //const distance = req.query.distance;
  //const keywords = req.query.keywords || '';

  const pageSize = Number.parseInt(req.query.pageSize) || 5; // used for pagination
  const page = req.query.currentPage - 1 || 0; // used to set 'offset' for pagination
  const offset = page * pageSize;

  if(searchString && searchString.length > 0) {
    const regex = new RegExp(searchString, 'i');
    query['name'] = regex;
  }

  console.log('query --> ', query);

  Group.aggregate([
    { $geoNear: {
        near: coords, 
        spherical: true,
        distanceField: "dist.calculated",
        maxDistance: req.query.maxDistance * 1000, 
        key: 'geoJSON', 
    }},
    { $match: query }, 
    { $facet: {
        paginatedResults: [{$skip: offset}, {$limit: pageSize}], 
        totalCount: [{$count: "count"}]
    }}, 
    { $lookup: {
      from: 'profile',
      localField: '_id',
      foreignField: 'imageableId',
      as: 'profile'
    }}, 
    /*{ $unwind: '$profile'},
    { $lookup: {
      from: 'picture',
      localField: 'profile._id',
      foreignField: 'parentId',
      as: 'profile.image',
    }} */
  ])
  .then(data => {
    console.log('searchGroups success --> ', data);
    const { paginatedResults, totalCount, } = data[0];
    return res.status(200).json({ groups: paginatedResults, count: totalCount[0].count });
  })
  .catch(err => handleError(res, err))
}

/*
* Required args: name, location, admin, lat, lon
* 
* 
*/
export const addGroup = async (req, res) => {
  console.log('createGroup body --> ', req.body);

  if (!req.body.name || !req.body.geoJSON || !req.body.admin) {
    return res.status(403).end('Invalid body arguments!');
  };

  // create Group object
  let group = new Group(req.body);
  group.admins = [req.body.admin];
  console.log('addGroup group --> ', group);

  group.save()
    .then(group => {
      return res.json({ group })
    })
    .catch(err => util.handleError(res, err))
}



/* FETCH ONE */

export const getGroup = (req, res) => {
  Group.findById(req.params.id)
    //.populate({ path: 'admins', populate: { path: 'user' }})
    .populate({ path: 'members', populate: { path: 'user' }})
    .populate({ path: 'profile', populate: { path: 'image' }})
    .then(group => {
      //console.log('getGroup --> ', group);
      return res.status(200).json({group});
    })
    .catch(err => handleError(res, err))
}

/* UPDATE */

export const updateGroup = (req, res) => {
  console.log('updating group --> ', req.body);
  Group.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .populate('admins', '_id name displayPicture')
    .populate('members', '_id name displayPicture')
    .populate('displayPicture')
    .then(group => {
      console.log('updatedGroup --> ', group);
      return res.status(200).json({ group });
    })
    .catch(err => handleError(res, err));
}

/* DELETE */

export const deleteGroup = (req, res) => {
  Group.findOneAndRemove({ _id: req.params.id })
    .then(response => res.status(204).end())
    .catch(err => handleError(res, err));
}

/* Custom Endpoints */

// used to join group
// req.body.memberId
export const joinGroup = async (req, res) => {
  if(!req.body.memberId) return res.status(501).send("Invalid request arguments");
  const { memberId } = req.body;

  try {
    let group = Group.findByIdAndUpdate(req.params.id, { members: { $addToSet: memberId }}, { new: true, runValidators: true })
      .populate('admins', '_id name displayPicture')
      .populate('members', '_id name displayPicture')
      .populate('displayPicture');
    let user = User.findByIdAndUpdate(memberId, { groups: { $addToSet: group._id }});
    return res.status(200).json({ group });
  } catch(err) {
    console.log('could not update user');
    return handleError(res, err);
  }
}

export const leaveGroup = async (req, res) => {
  if(!req.body.memberId) return res.status(501).send("Invalid request arguments");
  const { memberId } = req.body;

  try {
    let group = await Group.findByIdAndUpdate(req.params.id, { members: { $pull: memberId }}, { new: true, runValidators: true })
      .populate('admins', '_id name displayPicture')
      .populate('members', '_id name displayPicture')
      .populate('displayPicture');
    let user = await User.findByIdAndUpdate(memberId, { groups: { $pull: group._id }});
    return res.status(200).json({ group });
  } catch(err) {
    console.log('could not update user');
    return handleError(res, err);
  }
}




  /*Group.count(function(err, count) {
    if(err) return handleError(res, err);
    Group.find(query)
      .skip(offset)
      .limit(pageSize)
      .populate('members', '_id name displayPicture')
      .populate('displayPicture')
      .sort('-memberCount name')
      .exec(function(err, groups) {
        if(err) return handleError(res, err);
        return res.status(200).header('total-groups', count).json({ groups, count });
      });
  });*/



