
import Event from './event.model';

// used to retrieve one or more Event entries based on a custom query
// should be able to search 'by Group', 'by Upcoming', 'by Past', 'by Proposed', 'by Suggested'
export const searchEvents = (req, res) => {
  console.log('searchEvents query --> ', req.query);
  var query = {};

  const now = Date.now();
  switch(req.query.searchMode) {
    case 'Upcoming':
      query['end'] = { $gte: now };
      break;
    case 'Past':
      query['end'] = { $lt: now };
      break;
  }
  // add query support for 'Proposed'

  console.log('query --> ', query);

  //const location = req.query.location;
  //const distance = req.query.distance;
  //const keywords = req.query.keywords || '';

  const pageSize = req.query.pageSize || 10; // used for pagination, defaults to 10 per page
  const page = req.query.page ? req.query.page - 1 : 0; // used to set 'offset' for pagination, defaults to 0
  const offset = req.query.offset || page * pageSize;

  console.log('offset --> ', offset);
  console.log('pageSize --> ', pageSize);

  Event.count(query, function(err, count) {
    if(err) return handleError(res, err);
    Event.find(query)
      .skip(offset)
      .limit(Number.parseInt(pageSize))
      .populate('creator attendees notGoing waitlist', '_id name displayPicture')
      //.populate('group')
      .exec(function(err, events) {
        if(err) return handleError(res, err)
        //console.log('searchEvents results --> ', events);
        return res.status(200).header('total-events', count).json({ events, count });
      });
  });
}

/*
** used to retrieve a single Event instance
*/ 
export const getEvent = (req, res) => {
  Event.findById(req.params.id)
    .populate('creator attendees notGoing waitlist', '_id name displayPicture')
    .exec((err, event) => {
      if(err) return handleError(res, err);
      return res.status(200).json({event});
    });
}

/*
** create new Event
*/
export const addEvent = (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.location || !req.body.start || !req.body.end || !req.body.creator || !req.body.group) {
    return res.status(500).end('Invalid request body arguments!');
  };

  let event = new Event(req.body);
  event.attendees = [req.body.creator];
  console.log('addEvent event --> ', event);

  event.save((err, event) => {
    if (err) return handleError(res, err);
    return res.json({ event });
  });
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

  

  Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true }, (err, evt) => {
    if(err) return handleError(res, err);
    console.log('updatedEvent --> ', evt);
    return res.status(200).json({ event: evt });
  })
}

/*
** delete Event
*/
export const deleteEvent = (req, res) => {
  Event.findOneAndRemove({ _id: req.params.id }, (err, res) => {
    if (err) return handleError(res, err);
    return res.status(204).end();
  });
}

function handleError(res, err) {
  console.log('event handleError --> ', err);
  return res.status(500).send(err);
}
