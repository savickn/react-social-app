import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './GroupListItem.module.scss';

//import bgImg from '../../group-bk.jpeg';
import bgImg from '../../../../../shared/nophoto.png';
//import bgImg from '../../../../../shared/missing_avatar.png';
//import bgImg from '../../../../../shared/no-image-icon.png';

function GroupListItem(props) {
  const dp = props.group.displayPicture ? props.group.displayPicture.path : bgImg;
  console.log('groupitem dp --> ', dp);
  const bgd = { 
    backgroundImage: `url(${dp})`,
    backgroundColor: '#d3d3d3',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain', 
  };

  let linkStyle = `unstyled-link ${styles['flex-group-element']}`;
  
  return (
    <Link className={linkStyle} style={bgd} to={`/groups/${props.group._id}/`} >
      <span >
        <h3>{props.group.name}</h3>
        <p>{props.group.memberCount} Members</p>
      </span>
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
