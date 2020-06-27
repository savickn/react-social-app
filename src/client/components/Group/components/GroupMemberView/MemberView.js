
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faSearch, } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash';


import UserInfoPanel from '../../../User/components/UserInfoPanel';

import { searchMembershipsRequest } from '../../MembershipActions';
import { getMemberships } from '../../MembershipReducer';
import { openConnection } from '../../../Chat/ChatActions';
import { getCurrentUser } from '../../../User/AccountReducer';

import styles from './MemberView.scss';

class GroupMemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchMode: 'All', // can be 'All' or 'Organizers'
    }
  }

  // query Users api by passing GroupId (can use 'select' in Saga to cancel API call if Users in Redux store)
  componentWillMount() {
    this.fetchMembers();
  }

                                          /* Component Logic */

  // used to query the server
  fetchMembers = () => {
    const groupId = this.props.match.params.groupId;
    const { searchMode, searchString, } = this.state;

    const query = {
      groupId,
      searchMode,
      searchString, 
    };

    this.props.dispatch(searchMembershipsRequest(query));
  }

  // used to query specific groups of users (e.g. Normal vs. Admin users)
  changeSearchMode = (value) => {
    this.setState({ searchMode: value }, () => {
      this.fetchMembers();
    });
  }

  // used to handle changes to text input
  handleQueryChange = debounce((text) => {
    console.log('queryChanged');
    this.setState({ searchString: text }, () => {
      this.fetchMembers();
    })
  }, 1000)


  // open ChatView with Member
  openChat = (user) => {
    console.log('openChat --> ', user);
    this.props.dispatch(openConnection(user));
  }

                                          /* Styling Logic */

  styleSidebarElement = (text) => {
    return this.state.viewType === text ? `${styles.sidebarElem} ${styles.selected}` : styles.sidebarElem;
  }

                                          /* Render Logic */
  
  render() {
    const { members, currentUser } = this.props;
    if(!members) return <div></div>;

    const { searchMode } = this.state;

    return (
      <div className={`background full-width`}>
        <div className={`${styles.listAndSidebar} container`}>
          
          {/* filter events by member type (e.g. regular vs. admin) */}
          <div className={styles.sortingSidebar}>
            <div className={styles.sidebarElem} onClick={() => this.changeSearchMode('All')}>
              <span>All Members </span>
              { searchMode === 'All' &&
                <FontAwesomeIcon icon={faCircle} color='lightgreen' />
              }
            </div>
            <div className={styles.sidebarElem} onClick={() => this.changeSearchMode('Organizers')}>
              <span>Organizers </span>
              { searchMode === 'Organizers' && 
                <FontAwesomeIcon icon={faCircle} color='lightgreen' />
              }
            </div>
          </div>

          <div className={styles.mainSection}>
            <div className={styles.searchContainer}>
              <input type='text' placeholder='Search members...' className={styles.searchInput} 
                onChange={(e) => this.handleQueryChange(e.target.value)} />
              <FontAwesomeIcon icon={faSearch} className={styles.leftIcon}  />
            </div>

            {/* renders list of members */}
            {members && members.map((m) => {
              return <UserInfoPanel key={m._id} user={m.user} startChat={this.openChat} currentUserId={currentUser._id} />;
            })}
          </div>
        </div>
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: getMemberships(state), 
    currentUser: getCurrentUser(state),
  };
}

GroupMemberView.propTypes = {
  members: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(GroupMemberView);





      /*<div className='container'>
        <div className={`${styles.fullWidthBackground} full-width`}>
          
          <div className={`${styles.listAndSidebar} container`}>
            <div className={styles.sortingSidebar}>
              <div className={this.styleSidebarElement('all')} onClick={() => this.changeSearchMode('all')}>All Members</div>
              <div className={this.styleSidebarElement('admins')} onClick={() => this.changeSearchMode('admins')}>Admins</div>
            </div>

            <div className={styles.memberList}>
              { members && members.map((m) => {
                  return <UserInfoPanel name={m.user.name} role={m.role} />;
                })
              }
            </div>
          </div>
        </div>
            </div> */ 