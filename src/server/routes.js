
import path from 'path';


import userRoutes from './api/user/user.routes';
import groupRoutes from './api/group/group.routes';
import socialRoutes from './api/social/social.routes';
import commentRoutes from './api/comment/comment.routes';
import todoRoutes from './api/todo/todo.routes';
import pictureRoutes from './api/picture/picture.routes';
import albumRoutes from './api/album/album.routes';
import profileRoutes from './api/profile/profile.routes';
import eventRoutes from './api/event/event.routes';
import membershipRoutes from './api/membership/membership.routes';
import inviteRoutes from './api/invite/invite.routes';

import authRoutes from './auth/auth.routes';

export default function(app) {
  console.log('registering routes');
  app.use('/api/albums', albumRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/todos', todoRoutes);
  app.use('/api/groups', groupRoutes);
  app.use('/api/socials', socialRoutes);
  app.use('/api/comments', commentRoutes);
  app.use('/api/pictures', pictureRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/memberships', membershipRoutes); 
  app.use('/api/invites', inviteRoutes);
  app.use('/api/profiles', profileRoutes);

  
  app.use('/auth', authRoutes);
  
  //app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //    .get((req, res) => { return res.send('404!') });

  //used for SPA apps without SSR
  if(process.env.NODE_MODE === 'SPA') {
    console.log('Using SPA');
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
    });
  }
}


