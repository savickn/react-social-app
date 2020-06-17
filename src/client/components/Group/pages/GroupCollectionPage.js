import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import base64 from 'crypto-js/enc-base64';
import { isEmpty } from 'lodash';

import GroupList from '../components/GroupList';
import GroupCreateWidget from '../components/GroupCreateWidget/GroupCreateWidget';
import GroupSearchBar from '../components/GroupSearchBar/GroupSearchBar';
import Pagination from '../../Utilities/Pagination/Pagination';
import PaginationRedux from '../../Utilities/Pagination/PaginationRedux';
import Modal from '../../Utilities/Modal/modal';
import WizardHub from '../../Utilities/Wizard/wizard';
import WizardPage from '../../Utilities/Wizard/page';
//import AlbumCreateWidget from '../../Album/CreateAlbumWidget';

import { createGroup, searchGroups } from '../GroupActions';
//import { createAlbum } from '../../Album/AlbumActions';

import { autocompleteRequest, } from '../../Utilities/OSM/GeolocationActions';
import { getLocation, getAutocomplete, getGeojson, } from '../../Utilities/OSM/GeolocationReducer';
import { getGroups, getGroupCount, getLastGroup } from '../GroupReducer';
import { getCurrentUser, } from '../../User/AccountReducer';


import styles from './GroupCollectionPage.scss';

export class GroupCollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      displayType: 'Groups', // can be 'Groups' or 'Calendar'
      id: md5('Groups').toString(base64), // used to identify pagination/etc, should maybe be converted into mongoose virtual method
      createGroupState: 'None', // represents stage of creation process (e.g. None = hide modal, Group = create group, DisplayPic = create picture)


      // for custom Groups search
      search: {
        query: '',
        distance: 50, 
      }, 
      pagination: {
        currentPage: 1,
        pageSize: 12, 
      }, 
    };
  }

  componentDidMount() {
    // NOT WORKING CUZ .getGroups IS CALLED IN componentWillMount

    // check localStorage for pagination info
    // check localStorage for search query info
    // check localStorage for search results

    this.searchGroups();

    // populate Component state from localStorage (if fresh)
    /*if(typeof window !== undefined) {
      const item = localStorage.getItem(this.state.id);
      console.log('item --> ', item);
      if(item) {
        const state = JSON.parse(item);
        console.log('localStorage state --> ', state);
        let diffInMinutes = (Math.abs(state.date - Date.now())/1000)/60;
        console.log('diffInMinutes --> ', diffInMinutes);
        if(diffInMinutes < 15) {
          this.setState(state, () => {
            this.searchGroups();
          });
        } else {
          localStorage.removeItem(this.state.id);
        }
      }
    }*/
  };

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate', prevProps);
    // populate 'this.props.groups' after 'this.props.location' is resolved
    if(isEmpty(prevProps.location) && !isEmpty(this.props.location)) {
      this.searchGroups();
    }
  }


                                    /* SERVER REQUESTS */

  // search database for Groups
  searchGroups = (q={}) => {
    const { location, geojson, } = this.props;

    const query = {
      ...q,
      maxDistance: this.state.search.distance,
      coords: geojson, 
      currentPage: this.state.pagination.currentPage,
      pageSize: this.state.pagination.pageSize,
    };
    this.props.dispatch(searchGroups(query));
  };

  // update parent component search query
  handleQueryChanged = (search) => {
    console.log('queryChanged!');
    this.setState({ search: {
      ...search
    }}, () => {
      this.searchGroups();
    });
  }



  /* CREATE GROUP */

  // add new Group to database
  addGroup = (name, locData) => {
    const admin = this.props.currentUser._id;

    const location = locData.display_name.split(', ')[0];
    const geoJSON = {
      type: 'Point',
      coordinates: [ Number.parseFloat(locData.lon), Number.parseFloat(locData.lat) ],
      location, 
    };

    this.props.dispatch(createGroup({ name, geoJSON, admin }));
  };

  // query OSM for location suggestions
  getSuggestions = (query) => {
    const country_code = this.props.location.address.country_code;
    this.props.dispatch(autocompleteRequest({ location: query, country_code }));
  }

                                    /* STATE HANDLERS */

  changeDisplayType = (val) => {
    if(['Groups', 'Calendar'].includes(val)) {
      this.setState({ displayType: val });
    };
  };

                                    /* PAGINATION */

  // change pagination state then send AJAX request to repopulate products
  handlePaginationChange = (paginationState) => {
    this.setState({pagination: paginationState}, () => {
      if(typeof window !== undefined) {
        localStorage.setItem(this.state.id, JSON.stringify({...this.state, date: Date.now()}));
      }

      this.searchGroups();
    });
  }


                                    /* MODAL */

  openModal = () => {
    this.setState({showModal: true});  
  }

  closeModal = () => {
    // should prob save form data before closing
    this.setState({showModal: false});
  }

                                    /* RENDER LOGIC */

  render() {
    const { location } = this.props;

    const countryCode = location.properties ? location.address.country_code : null;

    return (
      <div>
        <div className={styles.bannerToggle}>
          <div className={styles.toggleBtn} onClick={() => this.changeDisplayType('Groups')}>Groups</div>
          <div className={styles.toggleBtn} onClick={() => this.changeDisplayType('Calendar')}>Calendar</div>
        </div>

        <GroupSearchBar search={this.handleSearch} displayType={this.state.displayType} changeDisplayType={this.changeDisplayType} 
          address={this.props.location.address} distance={this.state.search.dispatch} changeQuery={this.handleQueryChanged} />
        
        <GroupList groups={this.props.groups} displayType={this.state.displayType}/>
        <div className={styles.modalBtn}>
          <button className={`btn btn-default`} onClick={this.openModal}><span className='glyphicon glyphicon-plus click-cursor'></span></button>
        </div>
        
        <Modal isVisible={this.state.showModal} close={this.closeModal}>
          <GroupCreateWidget addGroup={this.addGroup} getSuggestions={this.getSuggestions} locationSuggestions={this.props.suggestions} />
        </Modal>
        <Pagination currentPage={this.state.pagination.currentPage} pageSize={this.state.pagination.pageSize} 
          collectionSize={this.props.groupCount} changePagination={this.handlePaginationChange} />
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

    // geocoding 
    location: getLocation(state),
    geojson: getGeojson(state),
    suggestions: getAutocomplete(state), 

  };
}

GroupCollectionPage.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCollectionPage);



    /*const album = {
      name: 'Display Pictures', 
      authorId: admin,
      imageableId: this.props.lastGroup._id,
      imageableType: 'Group',
    };
    this.props.dispatch(createAlbum(album));*/

  /*createAlbum = (albumData) => {
    const authorId = this.props.currentUser._id;
    const imageableType = 'Group';
    const imageableId = this.props.lastGroup._id;
    const album = Object.assign({}, albumData, {
      authorId,
      imageableId,
      imageableType, 
    });
    this.props.dispatch(createAlbum(album));
  }*/



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