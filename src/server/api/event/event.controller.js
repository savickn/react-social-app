
import Event from './event.model';

// used to retrieve one or more Event entries based on a custom query
// should be able to search 'by Group', 'by Upcoming', 'by Past', 'by Proposed', 'by Suggested'
export const searchEvents = async (req, res) => {
  console.log('searchEvents query --> ', req.query);
  var query = {};

  if(req.query.group) {
    query['group'] = req.query.group;
  }

  const now = new Date();
  switch(req.query.searchMode) {
    case 'Upcoming':
      query['end'] = { $gte: now };
      break;
    case 'Past':
      query['end'] = { $lt: now };
      break;
  }

  console.log('query --> ', query);

  //const location = req.query.location;
  //const distance = req.query.distance;
  //const keywords = req.query.keywords || '';

  const pageSize = req.query.pageSize || 10; // used for pagination, defaults to 10 per page
  const page = req.query.page ? req.query.page - 1 : 0; // used to set 'offset' for pagination, defaults to 0
  const offset = req.query.offset || page * pageSize;

  console.log('offset --> ', offset);
  console.log('pageSize --> ', pageSize);

  try {
    let count = await Event.count(query);
    let events = await Event.find(query)
      .skip(Number.parseInt(offset))
      .limit(Number.parseInt(pageSize))
      .populate({
        path: 'invites',
        match: { 
          status: 'Attending', 
          verified: true, 
          accepted: true, 
        },
        populate: {
          path: 'user',
          select: '_id name profile',
          populate: {
            path: 'profile',
            populate: { path: 'image' }
          }
        }

      })
      .populate({
        path: 'profile', 
        populate: { path: 'image' }
      });
    
    console.log('searchEvents results --> ', events);
    return res.status(200).header('total-events', count).json({ events, count });
  } catch(err) {
    return handleError(res, err);
  }
}

/*
** used to retrieve a single Event instance
*/ 
export const getEvent = (req, res) => {
  Event.findById(req.params.id)
    //.populate('creator attendees notGoing waitlist', '_id name displayPicture')
    .populate('creator', '_id name')
    .populate({
      path: 'group',
      select: 'name profile',
      populate: {
        path: 'profile',
        populate: {
          path: 'image', 
        }
      }
    })
    .populate({
      path: 'invites',
      //match: { attending: true },
      //perDocumentLimit: 4,
      populate: {
        path: 'user',
        select: '_id name profile role',
        populate: {
          path: 'profile',
          populate: {
            path: 'image',
          }
        }
      }
    })
    .then(event => {
      console.log('getEvent --> ', event);
      return res.status(200).json({event});
    })
    .catch(err => handleError(res, err))
}

/*
** create new Event
*/
export const addEvent = (req, res) => {
  console.log(req.body);
  if (!req.body.title || !req.body.description || !req.body.geoJSON || !req.body.start || !req.body.end || !req.body.creator || !req.body.group) {
    return res.status(500).end('Invalid request body arguments!');
  };

  let event = new Event(req.body);
  console.log('addEvent event --> ', event);

  Event.create(req.body)
    .then(async (event) => {
      await event.populate([
        {
          path: 'invites',
          match: { 
            status: 'Attending', 
            verified: true, 
            accepted: true, 
          },
          populate: {
            path: 'user',
            select: '_id name profile',
            populate: {
              path: 'profile',
              populate: { path: 'image' }
            }
          }
        },
        {
          path: 'profile', 
          populate: { path: 'image' }
        }
      ]);

      console.log('event --> ', event);
      return res.status(201).json({ event })
    })
    .catch(err => handleError(res, err)) 
}

/*
** Update an event
*/
export const updateEvent = (req, res) => {
  console.log('updating Event --> ', req.body);

  let updateObj = {};

  /* Update Attendees */
  if(req.body.attendee) {

  }

  Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(evt => {
      console.log('updatedEvent --> ', evt);
      return res.status(200).json({ event: evt });
    })
    .catch(err => handleError(res, err));
}

/*
** delete Event
*/
export const deleteEvent = (req, res) => {
  Event.findOneAndRemove({ _id: req.params.id })
    .then(response => res.status(204).end())
    .catch(err => handleError(res, err));
}


function handleError(res, err) {
  console.log('event handleError --> ', err);
  return res.status(500).send(err);
}
