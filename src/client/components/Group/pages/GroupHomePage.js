import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import base64 from 'crypto-js/enc-base64';

import GroupList from '../components/GroupList';
import GroupCreateWidget from '../components/GroupCreateWidget/GroupCreateWidget';
import GroupSearchBar from '../components/GroupSearchBar/GroupSearchBar';
import Pagination from '../../Utilities/Pagination/Pagination';
import PaginationRedux from '../../Utilities/Pagination/PaginationRedux';
import Modal from '../../Utilities/Modal/modal';
import WizardHub from '../../Utilities/Wizard/wizard';
import WizardPage from '../../Utilities/Wizard/page';
import AlbumCreateWidget from '../../Album/CreateAlbumWidget';

import { createGroup, fetchGroups } from '../GroupActions';
import { createAlbum } from '../../Album/AlbumActions';

import { getGroups, getGroupCount, getLastGroup } from '../GroupReducer';
import { getCurrentUser } from '../../User/AccountReducer';

export class GroupHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      displayType: 'Groups', // can be 'Groups' or 'Calender'
      id: md5('Groups').toString(base64), // used to identify pagination/etc, should maybe be converted into mongoose virtual method
      query: '',
      currentPage: 1,
      pageSize: 6,
      createGroupState: "None", // represents stage of creation process (e.g. None = hide modal, Group = create group, DisplayPic = create picture)
    };
  }

  componentWillMount() {
    this.getGroups();
  };

  componentDidMount() {
    // NOT WORKING CUZ .getGroups IS CALLED IN componentWillMount

    // check localStorage for pagination info
    // check localStorage for search query info
    // check localStorage for search results

    // populate Component state from localStorage (if fresh)
    if(typeof window !== undefined) {
      const item = localStorage.getItem(this.state.id);
      console.log('item --> ', item);
      if(item) {
        const state = JSON.parse(item);
        console.log('localStorage state --> ', state);
        let diffInMinutes = (Math.abs(state.date - Date.now())/1000)/60;
        console.log('diffInMinutes --> ', diffInMinutes);
        if(diffInMinutes < 15) {
          this.setState(state, () => {
            this.getGroups();
          });
        } else {
          localStorage.removeItem(this.state.id);
        }
      }
    }
  };

  /* SERVER REQUESTS */

  getGroups = (query={}) => {
    query = {
      ...query,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    };
    this.props.dispatch(fetchGroups(query));
  };

  addGroup = (name, location) => {
    const admin = this.props.currentUser._id;
    this.props.dispatch(createGroup({ name, location, admin }));

    
    /*const album = {
      name: 'Display Pictures', 
      authorId: admin,
      imageableId: this.props.lastGroup._id,
      imageableType: 'Group',
    };
    this.props.dispatch(createAlbum(album));*/
  };

  createAlbum = (albumData) => {
    const authorId = this.props.currentUser._id;
    const imageableType = 'Group';
    const imageableId = this.props.lastGroup._id;
    const album = Object.assign({}, albumData, {
      authorId,
      imageableId,
      imageableType, 
    });
    this.props.dispatch(createAlbum(album));
  }

  /* STATE HANDLERS */

  changeDisplayType = (value) => {
    if(['Groups', 'Calender'].includes(value)) {
      this.setState({displayType: value});
    };
  };

  changePageSize = (value) => {
    this.setState({pageSize: value}, () => {
      if(typeof window !== undefined) {
        localStorage.setItem(this.state.id, JSON.stringify({...this.state, date: Date.now()}));
      }
      this.getGroups();
    });
  }

  changeCurrentPage = (value) => {
    this.setState({currentPage: value}, () => {
      if(typeof window !== undefined) {
        localStorage.setItem(this.state.id, JSON.stringify({...this.state, date: Date.now()}));
      }
      this.getGroups();
    });
  }

  /* Modal Props */

  openModal = () => {
    this.setState({showModal: true});  
  }

  closeModal = () => {
    // should prob save form data before closing
    this.setState({showModal: false});
  }

  /* Wizard Props */

  onWizardComplete = () => {

  }

  // called by WizardPage to check if 
  validateGroupCreated = () => {

  }

  

  render() {
    return (
      <div>
        <GroupSearchBar search={this.handleSearch} displayType={this.state.displayType} changeDisplayType={this.changeDisplayType}/>
        <GroupList groups={this.props.groups} displayType={this.state.displayType}/>
        <button className='btn btn-default fill-container' onClick={this.openModal}><span className='glyphicon glyphicon-plus click-cursor'></span></button>
        <Modal isVisible={this.state.showModal} close={this.closeModal}>
          <GroupCreateWidget addGroup={this.addGroup} />
        </Modal>
        <Pagination currentPage={this.state.currentPage} pageSize={this.state.pageSize} collectionSize={this.props.groupCount}
          changeSize={this.changePageSize} changePage={this.changeCurrentPage} />
      </div>
    );
  }
}

/*
<WizardHub completedFunc={this.onWizardComplete}>
  <WizardPage>
    <GroupCreateWidget addGroup={this.addGroup} />
  </WizardPage>
  <WizardPage>
    <AlbumCreateWidget createAlbum={this.createAlbum} />
  </WizardPage>
</WizardHub>
*/

// <GroupList /> -> used to display MyGroups
// <GroupList /> -> used to display RecommendedGroups
// <GroupList /> -> used to display SearchResults

// SocialBanner -> used to display upcoming events for loggedIn user
// GroupList -> used to display groups that are Most Popular, Recommended For You, searchResults, etc

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    addGroup: (data) => dispatch(createGroup(data))
  }
}

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state),
    groups: getGroups(state),
    groupCount: getGroupCount(state),
    lastGroup: getLastGroup(state), 
  };
}

GroupHomePage.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupHomePage);


//<PaginationRedux collectionId={this.state.id} />

/*
<Pagination currentPage={this.state.currentPage} pageSize={this.state.pageSize} collectionSize={this.props.groupCount}
          changeSize={this.changePageSize} changePage={this.changeCurrentPage}/>
          */

/*
{!showingForm ?
  <button className='btn btn-md btn-default' onClick={this.toggleShowGroupForm}>Create Group</button> :
  <button className='btn btn-md btn-default' onClick={this.toggleShowGroupForm}>Hide Group Form</button>
}
<GroupCreateWidget addGroup={this.props.addGroup} shouldRender={this.state.showGroupForm}/>
*/