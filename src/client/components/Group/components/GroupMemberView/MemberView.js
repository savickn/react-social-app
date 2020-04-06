
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserInfoPanel from '../../../User/components/UserInfoPanel';

import { fetchMembershipsRequest } from '../../MembershipActions';
import { getMemberships } from '../../MembershipReducer';

import styles from './MemberView.scss';

class GroupMemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'all', // can be 'all' or 'admins'
    }
  }

  // query Users api by passing GroupId (can use 'select' in Saga to cancel API call if Users in Redux store)
  componentWillMount() {
    const groupId = this.props.match.params.groupId;
    this.props.dispatch(fetchMembershipsRequest({ group: groupId }));
  }

  /* Component logic */

  // used to query specific groups of users (e.g. Normal vs. Admin users)
  changeViewType = (value) => {
    this.setState({ viewType: value }, () => {
      // re-query server
    });
  }

  /* Styling logic */

  styleSidebarElement = (text) => {
    return this.state.viewType === text ? `${styles.sidebarElem} ${styles.selected}` : styles.sidebarElem;
  }

  /* UI logic */
  
  render() {
    if(!this.props.members) return <div></div>;
    console.log(this.props.members);

    return (
      <div className='container'>
        <div className={`${styles.fullWidthBackground} full-width`}>
          <div className={`${styles.listAndSidebar} container`}>
            <div className={styles.sortingSidebar}>
              <div className={this.styleSidebarElement('all')} onClick={() => this.changeViewType('all')}>All Members</div>
              <div className={this.styleSidebarElement('admins')} onClick={() => this.changeViewType('admins')}>Admins</div>
            </div>

            <div className={styles.memberList}>
              {
                this.props.members.map((m) => {
                  return <UserInfoPanel name={null} role={m.role} />;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: getMemberships(state),
  };
}

GroupMemberView.propTypes = {
  members: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(GroupMemberView);
