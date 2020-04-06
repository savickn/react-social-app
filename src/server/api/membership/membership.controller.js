
import Membership from './membership.model';

/* 
* returns collection of Memberships based on req.query (or returns all Memberships by default)
*/
export const searchMemberships = (req, res) => {
  console.log('searchMemberships req.query --> ', req.query);
  
  Membership.find(req.query)
    .populate('user', 'name')
    .then(memberships => res.status(200).json({ memberships }))
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

  Membership
    .findOne({ group: groupId, user: userId, })
    .then(membership => res.status(200).json({ membership }))
    .catch((err) => {
      console.log('getMembership err --> ', err);
      return res.status(500).send(err);
    })
}

/* 
** create new Membership using 'groupId' and 'userId'
*/
export const addMembership = (req, res) => {
  if(!req.body.groupId || !req.body.userId) {
    return res.status(501).send('Invalid request arguments!');
  }
  
  const data = {
    group: req.body.groupId, 
    user: req.body.userId, 
    role: req.body.role || 'Member', 
  };

  // add verification steps if necessary

  Membership.create(data)
    .then(res => res.status(201).json({ membership }))
    .catch(err => {
      console.error('createMembership err --> ', err);
      return res.status(500).send(err);
    });
}

/* 
** delete a Membership
*/
export const removeMembership = (req, res) => {
  Membership.findByIdAndRemove(req.params.id)
    .then(res => res.status(203).end())
    .catch(err => {
      console.log('removeMembership err --> ', err);
      return res.status(500).send(err);
    });
} 



