
import Membership from './membership.model';

/* 
* returns collection of Memberships based on req.query (or returns all Memberships by default)
* search by: group/user/role/user.name/
*/
export const searchMemberships = (req, res) => {
  //console.log('searchMemberships req.query --> ', req.query);
  const { userId, groupId, searchMode, searchString, } = req.query;

  const query = {};

  if(userId) query['user'] = userId;
  if(groupId) query['group'] = groupId;
  if(searchMode === 'Organizers') query['role'] = 'admin';


  const userQuery = {};

  if(searchString && searchString.length > 0) {
    const regex = new RegExp(searchString, 'i');
    userQuery['name'] = regex;
  }

  Membership.find(query)
    .populate({
      path: 'user',
      match: userQuery,
    })
    .then(data => {
      //console.log('searchMemberships json --> ', data);
      const memberships = data.filter((m) => m.user !== null)
      return res.status(200).json({ memberships })
    })
    .catch(err => {
      console.log('searchMemberships err --> ', err);
      return res.status(500).send(err);
    });
}

/* 
** returns single Membership instance via groupId and userId
*/
export const getMembership = (req, res) => {
  if(!req.query.groupId || !req.query.userId) {
    return res.status(501).send('Invalid request arguments!');
  }

  const { groupId, userId, } = req.query;

  Membership.findOne({ group: groupId, user: userId, })
    .then(membership => res.status(200).json({ membership }))
    .catch((err) => {
      console.log('getMembership err --> ', err);
      return res.status(500).send(err);
    })
}

/* 
** create new Membership using 'groupId' and 'userId'
*/
export const addMembership = async (req, res) => {
  const { groupId, userId, role } = req.body;

  if(!groupId || !userId) {
    return res.status(501).send('Invalid request arguments!');
  }
  
  const data = {
    group: groupId, 
    user: userId, 
    role: role || 'member', 
  };

  // working
  let exists = await Membership.findOne({ group: groupId, user: userId, });
  if(exists) return res.status(500).send('Already a member!');

  // add verification steps if necessary

  Membership.create(data)
    .then(membership => res.status(201).json({ membership }))
    .catch(err => {
      console.error('createMembership err --> ', err);
      return res.status(500).send(err);
    });
}

/* 
** delete a Membership
*/
export const removeMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    await membership.remove();
    return res.status(203).end();
  } catch(err) {
    console.log('removeMembership err --> ', err);
    return res.status(500).send(err);
  }
} 


/*
  Membership.findByIdAndRemove(req.params.id)
    .then(r => res.status(203).end())
    .catch(err => {
      console.log('removeMembership err --> ', err);
      return res.status(500).send(err);
    });
    */


