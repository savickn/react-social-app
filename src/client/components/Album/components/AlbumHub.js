
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, } from '@fortawesome/free-solid-svg-icons'


import Modal from '../../Utilities/Modal/modal';

import AlbumForm from './AlbumForm';
import AlbumIcon from './AlbumIcon';
import PhotoViewer from './PhotoViewer';

import { searchAlbumsRequest, createAlbumRequest, fetchAlbumRequest, } from '../AlbumActions';
import { getAlbums, getAlbumStatus, } from '../AlbumReducer';
import { getCurrentUser, } from '../../User/AccountReducer';

import styles from './AlbumHub.scss';

// represents the root component that displays AlbumIcons and an AlbumForm
class AlbumHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false, 
      complete: false, // used to track if new Album is uploaded
      //add thumbnail
      //add permissions
      
      viewerVisibility: false, 
      activeAlbum: null, 
      activeAlbumId: null, 
    }
  }

  // send GET request for Albums
  componentDidMount() {
    const { imageableId, imageableType, } = this.props;
    this.props.dispatch(searchAlbumsRequest({ imageableId, imageableType, }));
  }

  // update 'state.complete' if 'props.status === created'
  componentDidUpdate(prevProps, prevState) {
    // designed for AlbumForm but not used atm
    /*if(this.props.status === 'created' && prevProps.status !== 'created') {
      this.setState({ complete: true })
    }*/

    if(this.props.status === 'idle' && prevProps.status === 'loading') {
      // used to open PhotoViewer once 'activeAlbum' is loaded
      this.setState({ 
        activeAlbum: this.props.albums.filter(a => a._id === this.state.activeAlbumId)[0],
        viewerVisibility: true,
      }); 
    }
  }


                                                /* ALBUM FORM */

  // used to create Album
  createAlbum = (data) => {
    const { currentUser, imageableId, imageableType } = this.props;
    this.props.dispatch(createAlbumRequest({
      author: currentUser._id, 
      name: data.name, 
      description: data.description, 
      imageableId, 
      imageableType, 
    }, 
      data.imagesForm, 
      data.profileForm
    ));
  }

                                                /* MODAL */

  openModal = () => {
    this.setState({ modalVisibility: true });
  }

  closeModal = () => {
    this.setState({ modalVisibility: false });
  }

                                                /* PHOTO VIEWER */

  // used to open PhotoViewer and set 'activeAlbum'
  openPhotoViewer = (album) => {
    const { activeAlbum } = this.state;

    this.setState({ 
      activeAlbumId: album._id,
    }, () => this.props.dispatch(fetchAlbumRequest(album._id)));
  }

  closePhotoViewer = () => {
    this.setState({ viewerVisibility: false });
  }

                                                /* RENDER LOGIC */

  render() {
    const { albums, } = this.props;

    return (
      <div>
        <div className={styles.imgContainer}>
          {albums.slice(0, 5).map((a) => {
            const img = a.profile && a.profile.image ? a.profile.image.path : null;
            return (
              <div onClick={() => this.openPhotoViewer(a)}>
                <AlbumIcon key={a._id} albumId={a._id} image={img} />
              </div>
            )
          })}
          <button className='addIcon' onClick={this.openModal}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <Modal isVisible={this.state.modalVisibility} close={this.closeModal} >
          <AlbumForm handleSubmit={this.createAlbum} complete={this.state.complete} />
        </Modal>

        <PhotoViewer close={this.closePhotoViewer} isVisible={this.state.viewerVisibility} album={this.state.activeAlbum} />
      </div>
    )
  }
}

AlbumHub.propTypes = {
  imageableId: PropTypes.string.isRequired, 
  imageableType: PropTypes.string.isRequired, 
}

function mapStateToProps(state) {
  return {
    albums: getAlbums(state), 
    status: getAlbumStatus(state), // used to track when an Album is created (among other things)
    currentUser: getCurrentUser(state), 
  }
}

export default connect(mapStateToProps)(AlbumHub);
