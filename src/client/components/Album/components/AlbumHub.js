
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  createAlbum = (data) => {
    console.log('createAlbum --> ', data);

    const { currentUser, imageableId, imageableType } = this.props;

    this.props.dispatch(createAlbumRequest({
      author: currentUser._id, 
      name: data.name, 
      imageableId, 
      imageableType, 
    }));
  }

                                          /* UPLOAD MULTIPLE IMAGES */

  addImages = () => {

  }

                                                /* MODAL */

  openModal = () => {
    this.setState({ modalVisibility: true });
  }

  closeModal = () => {
    this.setState({ modalVisibility: false });
  }

  /* Render Logic */

  render() {
    const { albums } = this.props;

    return (
      <div className='albumHubContainer'>
        {albums.map((a) => {
          return <AlbumIcon />
        })}
        <button onClick={this.openModal}>+</button>

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
