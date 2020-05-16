
import Album from './album.model';

/* CRUD METHODS */

// used to retreive one or more Album resources (e.g. 'GET /albums')
export const searchAlbums = async (req, res) => { 
  console.log('searchAlbums --> ', req.query);
  var query = {};

  // used for sub-resource requests (e.g. 'GET /groups/123/albums')
  if(req.params.imageableId) {
    query.imageableId = req.params.imageableId;
  }

  const pageSize = req.query.pageSize || 5; // used for pagination
  const page = req.query.currentPage - 1 || 0; // used to set 'offset' for pagination
  const offset = page * pageSize;

  try {
    const count = await Album.count(query);
    const albums = await Album.find(query)
                            .skip(offset)
                            .limit(pageSize)
                            .sort('-memberCount name');
    return res.status(200).json({ albums, count });
  } catch(err) {
    return handleError(res, err);
  }
}

// used to create a new Album entry (e.g. 'POST /albums')
export const createAlbum = (req, res) => {
  if (!req.body.name || !req.body.author || !req.body.imageableId || !req.body.imageableType) {
    return res.status(403).end('Invalid arguments!');
  };

  Album.create(req.body)
    .then(album => res.status(201).json({ album }))
    .catch(err => handleError(res, err));
}

// used to delete an Album resource (e.g. 'DELETE /albums/123')
export const deleteAlbum = (req, res) => {
  Album.findByIdAndRemove(req.params.id)
    .then(r => res.status(203).end())
    .catch(err => handleError(res, err));
}

// used to retrieve a single Album resource (e.g. 'GET /albums/123')
export const getAlbum = (req, res) => {
  Album.findById(req.params.id)
    .then(album => res.status(200).json({ album }))
    .catch(err => handleError(res, err));
}


/* UTILITY */

function handleError(res, err) {
  console.error('albumErr --> ', err);
  return res.status(500).send(err);
}

/*
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
})*/