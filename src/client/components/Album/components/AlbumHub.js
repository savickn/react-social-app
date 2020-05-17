
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, } from '@fortawesome/free-solid-svg-icons'


import Modal from '../../Utilities/Modal/modal';

import AlbumForm from './AlbumForm';
import AlbumIcon from './AlbumIcon';

import { searchAlbumsRequest, createAlbumRequest, } from '../AlbumActions';
import { getAlbums, getAlbumStatus, } from '../AlbumReducer';
import { getCurrentUser, } from '../../User/AccountReducer';

// represents the root component that displays AlbumIcons and an AlbumForm
class AlbumHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false, 
      complete: false, // used to track if new Album is uploaded
    }
  }

  // send GET request for Albums
  componentDidMount() {
    const { imageableId, imageableType, } = this.props;
    this.props.dispatch(searchAlbumsRequest({ imageableId, imageableType, }));
  }

  // update 'state.complete' if 'props.status === created'
  componentWillUpdate(prevProps, prevState) {
    if(this.props.status === 'created' && prevProps.status !== 'created') {
      this.setState({ complete: true })
    }
  }


                                                /* ALBUM FORM */

  // used to create Album
  createAlbum = (data) => {
    console.log('createAlbum --> ', data);

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

                                                /* RENDER LOGIC */

  render() {
    const { albums } = this.props;

    return (
      <div className='albumHubContainer'>
        {albums.slice(0, 3).map((a) => {
          return <AlbumIcon key={a._id} albumId={a._id} image={a.profile.image.path} />
        })}
        <button className='addIcon' onClick={this.openModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <Modal isVisible={this.state.modalVisibility} close={this.closeModal} >
          <AlbumForm handleSubmit={this.createAlbum} complete={this.state.complete} />
        </Modal>
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
