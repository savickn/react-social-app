//import cuid from 'cuid';
//import slug from 'limax';
//import sanitizeHtml from 'sanitize-html';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import config from '../../config/environment';
import User from './user.model';


/* Search for users */
export const getUsers = (req, res) => {
  console.log('getUsers query --> ', req.query);
  let query = req.query || {};

  // if groupId
  // if eventId

  try {
    const count = User.count(query);
    const users = User.find(query)
                    .select('-salt -hashedPassword -provider');
    return res.status(200).json({ users, count });
  } catch(err) {
    return handleError(res, err);
  }
};


/* get all data for one user */
export const getUser = (req, res) => {
  User.findById(req.params.id)
    .select('-salt -hashedPassword -provider')
    .populate({
      path: 'groups',
      populate: {
        path: 'group',
        populate: {
          path: 'profile',
          populate: {
            path: 'image'
          }
        }
      }
    })
    .populate({
      path: 'events',
      populate: {
        path: 'event'
      }
    })
    .populate({
      path: 'profile',
      populate: {
        path: 'image'
      }
    })
    .then((user) => {
      const groupCount = user.groups.length;
      const eventCount = user.events.length;

      // remove dead references
      user.groups = user.groups.filter((m) => m.group != null);
      user.events = user.events.filter((i) => i.event != null);

      // save changes to database if dead references are found
      if(user.groups.length !== groupCount || user.groups.length !== eventCount) {
        user.save();
      }

      return res.status(200).json({ user });
    })
    .catch(err => handleError(res, err))
};


/* Used to create a new database entry for a User (also returns JWT for auth... is this best practise??)
*  Password
*  Name
*  Email
*/
export const addUser = (req, res) => {
  /* should perform validation of 'req.body' fields (e.g. must have Name/Email/Password) */

  User.count(function(err, count) {
    if (err) return res.status(500).send(err);
    let userObj = {
      provider: 'local',
      role: 'user'
    };
    if(count < 1) {
      userObj.role = 'admin';
    };
    let newUser = _.merge(userObj, req.body);
    console.log('newUser --> ', newUser);
    User.create(newUser, function(err, user) {
      console.log('err --> ', err, ' \n user --> ', user);
      if (err) { return res.status(500).send(err); };
      let token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: '5h' });
      return res.status(201).json({ token, user });
    });
  });
};

// used to retrieve the currently logged-in user via JSON token 
export const getMe = (req, res) => {
  User.findOne({_id: req.user._id})
    .select('-salt -hashedPassword -provider')
    .populate({
      path: 'groups',
      populate: {
        path: 'group',
        populate: {
          path: 'profile',
          populate: {
            path: 'image'
          }
        }
      }
    })
    .populate({
      path: 'events',
      populate: {
        path: 'event'
      }
    })
    .populate({
      path: 'profile',
      populate: {
        path: 'image'
      }
    })
    .exec(function(err, user) { // don't ever give out the password or salt
      if (err) return res.status(500).send(err);
      if (!user) return res.status(401).send('Unauthorized');
      //console.log('getMe --> ', user);

      const groupCount = user.groups.length;
      const eventCount = user.events.length;

      // remove dead references
      user.groups = user.groups.filter((m) => m.group != null);
      user.events = user.events.filter((i) => i.event != null);

      // save changes to database if dead references are found
      if(user.groups.length !== groupCount || user.groups.length !== eventCount) {
        user.save();
      }

      return res.status(200).json(user);
    });
};

/* delete a User */
export const deleteUser = (req, res) => {
  User.findOneAndRemove({_id: req.params._id}, function(err, user) {
    if (err) return res.status(500).send(err);
    return res.status(200).end();
  });
};

function handleError(res, err) {
  console.log('user handleError --> ', err);
  return res.status(500).send(err);
}
