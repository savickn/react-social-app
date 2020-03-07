
/* contains endpoints reachable via public API */

import Group from './group.model';
import Album from '../album/album.model';
import User from '../user/user.model';

import * as util from './groups.util';
const handleError = util.handleError;

/* CRUD METHODS */

export const searchGroups = (req, res) => {
  console.log('searchGroups --> ', req.query);
  var query = {};

  //const location = req.query.location;
  //const distance = req.query.distance;
  //const keywords = req.query.keywords || '';

  const pageSize = req.query.pageSize || 5; // used for pagination
  const page = req.query.currentPage - 1 || 0; // used to set 'offset' for pagination
  const offset = page * pageSize;


  Group.count(function(err, count) {
    if(err) return handleError(res, err);
    Group.find(query)
      .skip(offset)
      .limit(pageSize)
      .populate('admins', '_id name displayPicture')
      .populate('members', '_id name displayPicture')
      .populate('displayPicture')
      .sort('-memberCount name')
      .exec(function(err, groups) {
        if(err) return handleError(res, err)
        return res.status(200).header('total-groups', count).json({ groups, count });
      });
  });
}

export const getGroup = (req, res) => {
  Group.findById(req.params.id)
    .populate({ path: 'admins', populate: { path: 'user' }})
    .populate({ path: 'members', populate: { path: 'user' }})
    .populate('displayPicture')
    .exec((err, group) => {
      if(err) return handleError(res, err);
      console.log('getGroup --> ', group);
      return res.status(200).json({group});
  });
}

/*
* Required args: name, location, admin
* 
* 
*/
export const addGroup = async (req, res) => {
  if (!req.body.name || !req.body.location || !req.body.admin) {
    return res.status(403).end('Invalid body arguments!');
  };

  // create Group object
  let group = new Group(req.body);
  group.admins = [req.body.admin];
  console.log('addGroup group --> ', group);

  group.save((err, group) => {
    if(err) return util.handleError(res, err);
    return res.json({group});
  });
}

export const updateGroup = (req, res) => {
  console.log('updating group --> ', req.body);
  Group.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .populate('admins', '_id name displayPicture')
    .populate('members', '_id name displayPicture')
    .populate('displayPicture')
    .exec((err, group) => {
      if(err) return handleError(res, err);
      console.log('updatedGroup --> ', group);
      return res.status(200).json({ group });
  });
}

export const deleteGroup = (req, res) => {
  Group.findOneAndRemove({ _id: req.params.id }, (err, res) => {
    if (err) return handleError(res, err);
    return res.status(204).end();
  });
}

/* Custom Endpoints */

// used to join group
// req.body.memberId
export const joinGroup = (req, res) => {
  if(!req.body.memberId) return res.status(501).send("Invalid request arguments");
  const { memberId } = req.body;

  Group.findByIdAndUpdate(req.params.id, { members: { $addToSet: memberId }}, { new: true, runValidators: true })
    .populate('admins', '_id name displayPicture')
    .populate('members', '_id name displayPicture')
    .populate('displayPicture')
    .exec((err, group) => {
      if(err) return handleError(res, err);

      User.findByIdAndUpdate(memberId, { groups: { $addToSet: group._id }}, (err, user) => {
        if(err) { console.log('could not update user') };
      });

      return res.status(200).json({ group });
  });
}

export const leaveGroup = (req, res) => {
  if(!req.body.memberId) return res.status(501).send("Invalid request arguments");
  const { memberId } = req.body;

  Group.findByIdAndUpdate(req.params.id, { members: { $pull: memberId }}, { new: true, runValidators: true })
    .populate('admins', '_id name displayPicture')
    .populate('members', '_id name displayPicture')
    .populate('displayPicture')
    .exec((err, group) => {
      if(err) return handleError(res, err);

      User.findByIdAndUpdate(memberId, { groups: { $pull: group._id }}, (err, user) => {
        if(err) { console.log('could not update user') };
      });

      return res.status(200).json({ group });
  });
}






