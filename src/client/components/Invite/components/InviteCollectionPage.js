
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserCard from '../../User/components/UserCard';

import { searchInviteRequest } from '../InviteActions';
import { getInvites, } from '../InviteReducer';

import styles from './InviteCollectionPage.scss';

class InviteCollectionPage extends React.Component {

  /* lifecycle */

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'Attending',
    };
  }

  componentDidMount() {
    this.props.dispatch(searchInviteRequest({event: this.props.eventId}));
  }

  /* logic */

  updateTabView = (val) => {
    this.setState({currentTab: val});
  }

  isSelected = (val) => {
    return val === this.state.currentTab ? ' selected' : '';
  }

  render() {
    const { invites } = this.props;
    const selected = invites.filter((i) => i.status === this.state.currentTab);

    return (
      <div>
        <div className={styles.tabs}>
          <div onClick={() => this.updateTabView("Attending")} 
            className={`minimal-btn${this.isSelected('Attending')}`}>Attending</div>
          <div onClick={() => this.updateTabView("Waitlist")} 
            className={`minimal-btn${this.isSelected('Waitlist')}`}>Waitlist</div>
          <div onClick={() => this.updateTabView("NotAttending")} 
            className={`minimal-btn${this.isSelected('NotAttending')}`}>Not Attending</div>
        </div>

        <div className={styles.inviteList}>
          { selected.length > 0 ? selected.map((invite) => {
              return <UserCard user={invite.user} contentWidth='200' contentHeight='200' />
            }) : <div> No users at this time. </div>
          }
        </div>
      </div>
    );
  }
}

InviteCollectionPage.propTypes = {
  eventId: PropTypes.array.isRequired,
}

const mapStateToProps = (state, props) => {
  return {
    invites: getInvites(state, props.eventId),
  };
}

export default connect(mapStateToProps)(InviteCollectionPage);

