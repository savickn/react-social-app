
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAlbumRequest } from '../AlbumActions';
import { getAlbumById } from '../AlbumReducer';

// represents a Page that displays a single Album
class AlbumPage extends React.Component {

  /* LIFECYCLE LOGIC */

  constructor(props) {
    super(props);
    this.state= {}
  }

  componentDidMount() {
    this.props.dispatch(fetchAlbumRequest(this.props.match.params.albumId))
  }

  /* RENDER LOGIC */

  render() {
    const { album } = this.props;
    if(!album) return <div></div>

    return (
      <div>
        <div className='banner'>
          <div>author</div>
          <div>preview</div>
        </div>
        <div className='grid'>

          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    album: getAlbumById(state, props.match.params.albumId),
  }
}

export default connect(mapStateToProps)(AlbumPage);
