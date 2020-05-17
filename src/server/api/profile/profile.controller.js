
import Profile from './profile.model';

/* 
** create a Profile 
*/
export const createProfile = (req, res) => {
  console.log('createProfile body --> ', req.body);
  if(!req.body.imageableId || !req.body.imageableType) {
    return res.status(500).send('Invalid Arguments!');
  }

  Profile.create(req.body)
    .then(profile => res.status(201).json({ profile }))
    .catch(err => {
      console.log('createProfile err --> ', err);
      return res.status(500).send(err) 
    })
}

/*
** fetch a Profile
*/
export const fetchProfile = (req, res) => {
  Profile.findById(req.params.id)
    .populate('image')
    .then(profile => res.status(200).json({ profile }))
    .catch(err => res.status(500).send(err));
}






/*
// update a Profile
export const updateProfile = (req, res) => {
  if(!req.body.image) {
    return res.status(500).send('Invalid Arguments!');
  }

  const { image } = req.body;
  Profile.findByIdAndUpdate(req.params.id, { $set: { image }}, { new: true, runValidators: true, })
    .then(profile => res.status(200).json({profile}))
    .catch(err => res.status(500).send(err))
}
*/