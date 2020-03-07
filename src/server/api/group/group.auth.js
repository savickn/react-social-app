
import Group from './group.model';

export const isGroupAdmin = (req, res, next) => {
  Group.findAdminsByGroup(req.params.id).then((admins) => {
    console.log(admins);
  }).catch((err) => {
    return next(err);
  });
}

