import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './GroupListItem.scss';

//import bgImg from '../../group-bk.jpeg';
import bgImg from '../../../../../shared/nophoto.png';
//import bgImg from '../../../../../shared/missing_avatar.png';
//import bgImg from '../../../../../shared/no-image-icon.png';

import noImg from '../../../../../shared/no-image-icon.png'

function GroupListItem(props) {
  const dp = props.group.displayPicture ? props.group.displayPicture.path : noImg;
  //console.log('groupitem dp --> ', dp);
  const bgd = { 
    //backgroundImage: `url(${dp})`,
    backgroundColor: '#ebeced',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain', 

    borderRadius: '50px',
  };

  let linkStyle = `unstyled-link`;

  return (
    <Link className={linkStyle} to={`/groups/${props.group._id}/events`} >
      <div className={styles.flexGroupElement} style={bgd} >
        <h3>{props.group.name}</h3>
        <p>{props.group.geoJSON.location}</p>
        <p>{props.group.members.length} Members</p>
      </div>
    </Link>
  );
}

GroupListItem.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    //slug: PropTypes.string.isRequired,
    //cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupListItem;
