
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import styles from './AlbumIcon.scss';

import noPic from '../../../../shared/no-image-icon.png';

// used to display thumbnail + info about an Album
class AlbumIcon extends React.Component {
  render() {
    const image = this.props.image || noPic;

    return (
      <img src={image} width='105' height='130' className={styles.albumImg} />
    )
  }
}

AlbumIcon.propTypes = {
  albumId: PropTypes.string.isRequired,
  image: PropTypes.string, 
}

export default AlbumIcon;

{ /*
  <Link to={`/albums/${this.props.albumId}`}>
    <img src={image} width='105' height='130' className={styles.albumImg} />
  </Link>
  */ }
