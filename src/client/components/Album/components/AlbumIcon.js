
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import noPic from '../../../../shared/no-image-icon.png';

// used to display thumbnail + info about an Album
class AlbumIcon extends React.Component {
  render() {
    const image = this.props.image || noPic;

    return (
      <Link to={`/albums/${this.props.albumId}`}>
        <img src={image} width='100' height='150' />
      </Link>
    )
  }
}

AlbumIcon.propTypes = {
  albumId: PropTypes.string.isRequired,
  image: PropTypes.string, 
}

export default AlbumIcon;
