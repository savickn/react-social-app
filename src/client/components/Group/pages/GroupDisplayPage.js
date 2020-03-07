import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap';

import { HomeView, MemberView, EventView } from '../GroupRoutes';
import axios from '../../../util/axiosCaller';
import { matchByObjectId } from '../../../util/utilFuncs';

import GroupBanner from '../components/GroupBanner/GroupBanner';

import { fetchGroup, updateGroup } from '../GroupActions';
import { createMembership, deleteMembership } from '../MembershipActions';

import { getGroupById } from '../GroupReducer';
import { getCurrentUser } from '../../User/AccountReducer';

import noImg from '../../../../shared/no_image.jpg';

export class GroupDisplayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      altImg: noImg,
      role: 'none'
    }
  }

  componentWillMount() {
    //console.log('match --> ', this.props.match);
    this.props.dispatch(fetchGroup(this.props.match.params.groupId));
  }

  /* Component logic */

  getRole(group, userId) {
    //console.log('getrole --> ', group, userId);
    if(group && matchByObjectId(group.admins, userId)) return 'admin';
    if(group && matchByObjectId(group.members, userId)) return 'member';
    return 'none';
  }

  /* event handlers */

  handleImageChange = (formData) => {
    //console.log('group --> ', this.props.group);
    formData.append('albumId', this.props.group.albums[0]);

    if(typeof window != undefined) {
      const fr = new FileReader();
      const files = [];
      for(let x of formData.values()) {
        console.log(x);
        files.push(x);
      }

      fr.addEventListener('load', () => {
        console.log('dataurl --> ', fr.result);
        this.setState({altImg: fr.result});
      });
      fr.readAsDataURL(files[0]);
    }

    axios.post('/api/pictures/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log('group dp upload response --> ', res);
      let updatedGroup = Object.assign({}, this.props.group, { displayPicture: res.data.picture._id });
      console.log('updatedGroup --> ', updatedGroup);
      this.props.dispatch(updateGroup(updatedGroup));
    }).catch((err) => {
      console.log(err);
    })
  }

  // used to create new album (either empty or with pictures)
  handleCreateAlbum = (name, authorId, permissionType, pictures=[]) => {
    this.props.dispatch(updateGroup(alteredGroup));
  }

  // should change to create Request object instead eventually
  handleJoinGroup = (isNone) => {
    if(isNone) {
      //const alteredGroup = {...this.props.group};
      //alteredGroup.members.push({user: this.props.currentUser._id, group: this.props.group._id});
      this.props.dispatch(createMembership(this.props.group._id, this.props.currentUser._id));
    }
  }

  handleLeaveGroup = () => {
    const membershipId = this.props.group.members.filter(m => {
      return m.user === this.props.currentUser._id;
    })[0];
    console.log('handleLeave memberId --> ', membershipId);

    this.props.dispatch(deleteMembership(membershipId));
    
    /*const userId = this.props.currentUser._id;
    const alteredGroup = {...this.props.group};
    alteredGroup.members = alteredGroup.members.filter((elem) => {
      if(!elem === userId || !elem._id === userId) {
        return elem;
      }
    });*/
    //this.props.dispatch(updateGroup(alteredGroup));
  }

  /* UI logic */

  getJoinLeaveButton = (isNone) => {
    return isNone ?
    <NavItem eventKey={4}>
      <button className='btn btn-default' onClick={() => this.handleJoinGroup(isNone)}>Join Group</button>
    </NavItem>
    : 
    <NavDropdown eventKey={4} title="You're a member!" id="basic-nav-dropdown">
      <MenuItem eventKey={4.3} onClick={() => this.handleLeaveGroup()}>Leave Group</MenuItem>
    </NavDropdown>
  }

  render() {
    if(!this.props.group) return(<div></div>);

    const dp = this.props.group.displayPicture ? this.props.group.displayPicture.path : this.state.altImg;
    const role = this.getRole(this.props.group, this.props.currentUser._id);
    const isMember = role === 'member';
    const isAdmin = role === 'admin';
    const isNone = role === 'none';

    console.log('role --> ', role);
    console.log('groupDisplay state --> ', this.state);
    return (
      <React.Fragment>
        <GroupBanner groupName={this.props.group.name} location={this.props.group.location} memberCount={this.props.group.memberCount}
          displayPicture={dp} admins={this.props.group.admins} isMember={isMember} handleImageChange={this.handleImageChange}/>
        <Navbar>
          <Nav>
            <LinkContainer to={`/groups/${this.props.group._id}`}>
              <NavItem eventKey={1}>About</NavItem>
            </LinkContainer>
            <LinkContainer to={`/groups/${this.props.group._id}/events`}>
              <NavItem eventKey={1}>Events</NavItem>
            </LinkContainer>
            <LinkContainer to={`/groups/${this.props.group._id}/members`}>
              <NavItem eventKey={2}>Members</NavItem>
            </LinkContainer>
            <LinkContainer to={`/groups/${this.props.group._id}/settings`}>
              <NavItem eventKey={3}>Settings</NavItem>
            </LinkContainer>
            {isNone ?
              <NavItem eventKey={4}>
                <button className='btn btn-default' onClick={() => this.handleJoinGroup(isNone)}>Join Group</button>
              </NavItem>
              : 
              <NavDropdown eventKey={4} title="You're a member!" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1} onClick={() => this.handleLeaveGroup()}>Leave Group</MenuItem>
              </NavDropdown>
            }
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/groups/:groupId" component={HomeView} />
          <Route path="/groups/:groupId/members" component={MemberView} /> 
          <Route path="/groups/:groupId/events" render={(props) =>
            <EventView {...props} groupId={this.props.group._id} /> 
          } />
        </Switch>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: getCurrentUser(state),
    group: getGroupById(state, props.match.params.groupId),
  };
};

GroupDisplayPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(GroupDisplayPage);




/* OLD 

  // should change to create Request object instead eventually
  handleJoinGroup = (isNone) => {
    if(isNone) {
      const alteredGroup = {...this.props.group};
      alteredGroup.members.push(this.props.currentUser._id);
      this.props.dispatch(updateGroup(alteredGroup));
    }
  }

  handleLeaveGroup = () => {
    const userId = this.props.currentUser._id;
    const alteredGroup = {...this.props.group};
    alteredGroup.members = alteredGroup.members.filter((elem) => {
      if(!elem === userId || !elem._id === userId) {
        return elem;
      }
    });
    this.props.dispatch(updateGroup(alteredGroup));
  }
  */