
import Membership from './membership.model';

/* returns collection of Memberships based on req.query (or returns all Memberships by default)
*
*/
export const searchMemberships = (req, res) => {
  const query = {};
  console.log('searchMemberships query --> ', query);
  Membership.find(query, (err, memberships) => {
    console.log(`searchMemberships err --> ${err}, \n memberships --> ${memberships}`);
    if(err) { return res.status(500).send(err); }
    return res.status(200).json({ memberships });  
  })
}

/* Must provide following args in req.body:
* groupId
* userId
*/
export const addMembership = (req, res) => {
  if(!req.body.groupId || !req.body.userId) return res.status(501).send('Invalid request arguments!');
  const membership = new Membership({
    group: req.body.groupId, 
    user: req.body.userId, 
  });
  membership.save((err, membership) => {
    console.log(`addMembership err --> ${err}, \n membership --> ${membership}`);
    if(err) return res.status(500).send(err);
    return res.status(201).json({ membership });
  });
}

/* removes one membership
*
*/
export const removeMembership = (req, res) => {
  Membership.findByIdAndRemove(req.params.id, (err, m) => {
    console.log(`removeMembership err --> ${err}, \n result --> ${m}`);
    if(err) return res.status(500).send(err);
    return res.status(200).end();
  });
} 



