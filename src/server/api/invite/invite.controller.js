
import Invite from './invite.model';

/* Must provide following args in req.body:
* eventId
* userId
*/
export const addInvite = (req, res) => {
  if(!req.body.eventId || !req.body.userId) return res.status(501).send('Invalid request arguments!');
  const invite = new Invite({
    event: req.body.eventId, 
    user: req.body.userId, 
  });
  invite.save((err, invite) => {
    if(err) return res.status(501).send('An error occurred! Unable to invite user.');
    return res.status(201).json({ invite });
  });
}

export const removeInvite = (req, res) => {
  Invite.findByIdAndRemove(req.params.id, (err, invite) => {
    if(err) return res.status(501).send('Unable to cancel invite.');
    return res.status(200).end();
  });
} 

