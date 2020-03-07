
import Album from './album.model';

/* CRUD METHODS */

// used to retreive one or more Album resources (e.g. 'GET /albums')
export const searchAlbums = (req, res) => { 
  console.log('searchAlbums --> ', req.query);
  var query = {};

  // used for sub-resource requests (e.g. 'GET /groups/123/albums')
  if(req.params.imageableId) {
    query.imageableId = req.params.imageableId;
  }

  const pageSize = req.query.pageSize || 5; // used for pagination
  const page = req.query.currentPage - 1 || 0; // used to set 'offset' for pagination
  const offset = page * pageSize;

  Album.count(function(err, count) {
    if(err) return handleError(res, err);
    Album.find(query)
      .skip(offset)
      .limit(pageSize)
      .sort('-memberCount name')
      .exec(function(err, albums) {
        if(err) return handleError(res, err)
        return res.status(200).header('total-albums', count).json({ albums, count });
      });
  })
}

// used to retrieve a single Album resource (e.g. 'GET /albums/123')
export const getAlbum = (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if(err) return handleError(res, err);
    return res.status(200).json({album});
  }) 
}

// used to create a new Album entry (e.g. 'POST /albums')
export const addAlbum = (req, res) => {
  if (!req.body.name || !req.body.authorId || !req.body.imageableId || !req.body.imageableType) {
    return res.status(403).end('Invalid arguments!');
  };

  Album.create(req.body, (err, album) => {
    if (err) return handleError(res, err);
    return res.json({ album });
  });
}

// used to update an Album resource (e.g. 'PUT /albums/123')
// only 'name' can be updated
export const updateAlbum = (req, res) => {
  console.log('updating album --> ', req.body);
  Album.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true }, (err, album) => {
    if(err) return handleError(res, err);
    console.log('updatedAlbum --> ', album);
    return res.status(200).json({ album });
  });
}

// used to delete an Album resource (e.g. 'DELETE /albums/123')
export const deleteAlbum = (req, res) => {
  Album.findOneAndRemove({ _id: req.params.id }, (err, res) => {
    if (err) return handleError(res, err);
    return res.status(204).end();
  });
}

/* UTILITY METHODS */ 

function handleError(res, err) {
  return res.status(500).send(err);
}
