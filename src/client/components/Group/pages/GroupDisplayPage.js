import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap';

import Profile from '../../Profile/Profile';

import { HomeView, MemberView, EventView } from '../GroupRoutes';
import axios from '../../../util/axiosCaller';
import { matchByObjectId } from '../../../util/utilFuncs';

import { fetchGroup, updateGroup } from '../GroupActions';
import { fetchMembershipRequest, createMembership, deleteMembership } from '../MembershipActions';

import { getGroupById } from '../GroupReducer';
import { getCurrentUser } from '../../User/AccountReducer';
import { myMembership } from '../MembershipReducer';

import noImg from '../../../../shared/no_image.jpg';

import styles from './GroupDisplayPage.scss';

export class GroupDisplayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      altImg: noImg,
      role: null, 
    }
  }

  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.dispatch(fetchGroup(groupId));
    this.props.dispatch(fetchMembershipRequest(groupId, this.props.currentUser._id));
    this.setRole();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.membership !== this.props.membership) {
      console.log('props.membership updated!')
      this.setRole();
    }
  }

                                      /* State Logic */

  // sets currentUser's role in this.state (e.g. 'admin/member/none')
  setRole() {
    //console.log('setRole props --> ', this.props);
    const membership = this.props.membership;
    const role = membership ? membership.role : 'none';
    //console.log('setRole --> ', role);
    this.setState({ role });
  }

                                      /* Image Handlers */


  // used to create new album (either empty or with pictures)
  handleCreateAlbum = (name, authorId, permissionType, pictures=[]) => {
    this.props.dispatch(updateGroup(alteredGroup));
  }

                                    /* Membership Handlers */

  // used to join the Group by creating a Membership
  /* should change to support Request objects eventually */
  handleJoinGroup = (isNone) => {
    if(isNone) {
      // also add some server-side protection against this!!!
      this.props.dispatch(createMembership(this.props.group._id, this.props.currentUser._id));
    } else {
      console.log('You are already a member of this group!'); 
    }
  }

  // used to leave a Group by deleting a Membership
  handleLeaveGroup = () => {
    const id = this.props.membership._id;
    console.log('handleLeave memberId --> ', id);
    this.props.dispatch(deleteMembership(id));
  }

  /* Render Logic */

  render() {
    const { group } = this.props;
    if(!group) return(<div></div>);

    //console.log('groupDisplay state --> ', this.state);

    //const dp = this.props.group.displayPicture ? this.props.group.displayPicture.path : this.state.altImg;
    const profileId = group.profile ? group.profile._id : null;

    const isNone = this.state.role === 'none';
    const isMember = this.state.role === 'member';

    return (
      <React.Fragment>
        
        {/* BANNER */}
        <div className={styles.groupBanner}>
          <div className={styles.groupImg}>
            <Profile profileId={profileId} imageableId={group._id} imageableType='Group' />
          </div>
          <div className={styles.groupInfo}>
            <div className={styles.groupName}>{this.props.group.name}</div>
            <div>Location: {group.geoJSON.location}</div>
            <div>Members: {group.memberCount}</div>
          </div>
        </div>

        {/* NAVBAR */}
        <Navbar className={'background-full-width'} fluid>
          <Nav>
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
        
        {/* VIEWS */}
        <Switch>
          { /* <Route exact path="/groups/:groupId" component={HomeView} /> */ }
          <Route path="/groups/:groupId/members" component={MemberView} /> 
          <Route path="/groups/:groupId/events" render={(props) =>
            <EventView {...props} groupId={this.props.group._id} groupDp={noImg} /> 
          } />
        </Switch>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: getCurrentUser(state),
    membership: myMembership(state), 
    group: getGroupById(state, props.match.params.groupId),
  };
};

GroupDisplayPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(GroupDisplayPage);



/* OLD

  // change display picture
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
  */


/* OLD
  // ?????
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
*/

 /* OLD
 handleLeaveGroup = () => {
    
    
  const membershipId = this.props.group.members.filter(m => {
    return m.user === this.props.currentUser._id;
  })[0];
  console.log('handleLeave memberId --> ', membershipId);

  this.props.dispatch(deleteMembership(membershipId));
  
  const userId = this.props.currentUser._id;
  const alteredGroup = {...this.props.group};
  alteredGroup.members = alteredGroup.members.filter((elem) => {
    if(!elem === userId || !elem._id === userId) {
      return elem;
    }
  });
  //this.props.dispatch(updateGroup(alteredGroup));
}*/


/*
// returns object with 'isAdmin/isMember/isNone'
  getRole() {
    let roles = {
      isNone: true,
      isMember: false,
      isAdmin: false, 
    };
    
    if(this.props.membership ) {
      roles.isNone = false;
      roles.isMember = true;

      if(this.props.membership.role === 'Admin') {
        roles.isAdmin = true;
      }
    }

    console.log('getRoles --> ', roles);
    return roles;
  }

  */


  /* OLD
  getRole(group, userId) {
    //console.log('getrole --> ', group, userId);
    if(group && matchByObjectId(group.admins, userId)) return 'admin';
    if(group && matchByObjectId(group.members, userId)) return 'member';
    return 'none';
  }*/


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