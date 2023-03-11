
import Invite from './invite.model';

/*
** used to return a collection of Invites based on search criteria
*/
export const searchInvites = (req, res) => {
  console.log('searchInvites query --> ', req.query);

  // can search by:
  // eventId, userId
  // attending, waitlist, etc
  // issueType (e.g. an invite or request)

  Invite.find(req.query)
    .populate({
      path: 'user',
      select: '_id name profile',
      populate: {
        path: 'profile',
        populate: {
          path: 'image',
        }
      }
    })
    .then(invites => res.status(200).json({ invites }))
    .catch(err => {
      console.error('searchInvites err --> ', err);
      return res.status(500).send(err);
    })
}

/*
** used to create an Invite
*/
export const createInvite = async (req, res) => {
  console.log('createInvite req.body --> ', req.body);
  const { event, user } = req.body;
  if(!event || !user) {
    return res.status(501).send('Invalid arguments!');
  }

  try {
    const existingInvite = await Invite.find({ event: req.body.event, user: req.body.user });
    console.log('existingInvite --> ', existingInvite);
    
    // guard against duplicate Invites
    if(existingInvite && existingInvite.length > 0) {
      throw new Error('Duplicate invite!');
    }

    const invite = await Invite.create(req.body);
    
    return res.status(201).json({ invite });

  } catch(err) {
    console.error('createInvite err --> ', err);
    return res.status(500).send(err);
  }

  // check that duplicate Invite doesn't exist
  /*Invite.find({ event: req.body.event, user: req.body.user })
    .then()


  // check 'inviteOnly' status of Event

  Invite.create(req.body)
    .then(invite => res.status(201).json({ invite }))
    .catch(err => {
      console.error('createInvite err --> ', err);
      return res.status(500).send(err);
    })*/
}

// used to delete an Invite
export const deleteInvite = (req, res) => {
  Invite.findByIdAndRemove(req.params.id, (err, invite) => {
    if(err) return res.status(501).send('Unable to cancel invite.');
    return res.status(200).end();
  });
} 

// used to handle Accepting/Rejecting the Invite/etc
export const updateInvite = (req, res) => {
  
  // lots of validation
  // lots of validation

  Invite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, })
    .populate({
      path: 'user',
      select: '_id name profile',
      populate: {
        path: 'profile',
        populate: {
          path: 'image',
        }
      }
    })
    .exec()
    .then(invite => res.status(200).json({ invite }))
    .catch(err => handleError(res, err))
}


function handleError(res, err) {
  console.error('invite err --> ', err);
  return res.status(500).send(err);
}

