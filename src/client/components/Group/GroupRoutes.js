

import React from 'react';
//import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

const options = {
  fallback: <div> Loading... </div>
};

//export const HomeView = loadable(() => import('./components/GroupHomeView/HomeView'), options);
export const MemberView = loadable(() => import('./components/GroupMemberView/MemberView'), options);
export const EventView = loadable(() => import('../Event/pages/EventCollectionPage'), options);
//export const AlbumView = loadable(() => import('./components/App/components/Home/HomePage'), options);
//export const DiscussionView = loadable(() => import('./components/App/components/Home/HomePage'), options);


/*export default (
  <Switch>
    <Route exact path="/groups/:groupId" component={HomeView} />
    <Route path="/groups/:groupId/members" component={MemberView} /> 
    <Route path="/groups/:groupId/events" component={EventView} />
  </Switch>
)*/


/*
export default (myProps) => {
  return (
    <Switch>
      <Route exact path="/groups/:groupId" component={HomeView} />
      <Route path="/groups/:groupId/members" render={(props) => <MemberView admins={props.group.admins} members={props.group.members} />} />
    </Switch>
  )
}
*/