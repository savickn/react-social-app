
import React from 'react';
import PropTypes from 'prop-types';

import styles from './InviteWidget.scss';

class InviteEditWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.invite.status,
    };
  }

  // used to change component state
  handleSelectStatus = (val) => {
    this.setState({status: val});
  }

  // used to save status to server
  handleChangeStatus = (e) => {
    if(this.isChange()) {
      this.props.changeStatus({
        status: this.state.status,
        accepted: true,
      });
    }
  }

  isAccepted() {
    return this.state.status === 'Attending';
  }

  // used to determine if current state is different than original state (e.g. update is pending)
  isChange() {
    return this.state.status !== this.props.invite.status;
  }

  render() {
    const { invite } = this.props;
    console.log('invWidget inite --> ', invite);
    console.log(this.state);

    return (
      <div className={styles.inviteContainer}>
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${this.isAccepted() ? styles.selected : ''}`}
            onClick={() => this.handleSelectStatus('Attending')}>
              Accept
          </button>
          <button className={`${styles.btn} ${!this.isAccepted() ? styles.selected : ''}`}
            onClick={() => this.handleSelectStatus('Not Attending')}>
              Decline
          </button>
        </div>
        <div className={styles.saveChanges}>
          <button className={`minimal-btn ${this.isChange() ? styles.isChanged : ''}`} onClick={this.handleChangeStatus}> Save Changes </button>
        </div>
      </div>
    );
  }
}

InviteEditWidget.propTypes = {
  invite: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired, 
}

export default InviteEditWidget;
