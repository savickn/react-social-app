
import Profile from './profile.model';

/* used to create a Profile picture
* imageableType, imageableId 
*/
export const createProfile = (req, res) => {
  console.log('req.body --> ', req.body);
  console.log('req.file --> ', req.file);

  const pObj = new Profile({
    
  });

  pObj.save((err, profile) => {
    if(err) return res.status(500).send('Unable to create Profile!');
    return res.status(201).json({profile});
  });
}


