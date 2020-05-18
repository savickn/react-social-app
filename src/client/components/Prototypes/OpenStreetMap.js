
import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

//import axios from '../../util/axiosCaller';

import { getGeocode, getAutocomplete, } from '../Utilities/OSM/GeolocationReducer';
import { geocodeRequest, autocompleteRequest, } from '../Utilities/OSM/GeolocationActions';

class OSMPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: '', 
      location: '', 
    };
  }

  /*componentDidMount() {
    axios.get('https://nominatim.openstreetmap.org/search?city=Toronto&country=Canada&format=json')
      .then(res => res.data)
      .then(obj => {
        console.log('obj --> ', obj);
      })
  }*/

  /* EVENT HANDLERS */

  // used to update 'location' in 'this.state'
  onLocationChange = debounce((location) => {
    this.setState({ location }, () => {
      this.getAutocomplete();
    })
  }, 500)

  // 
  getAutocomplete = () => {
    const { location } = this.state;
    this.props.dispatch(autocompleteRequest({ location }));
  }

  // 
  getGeocode = () => {
    const { location } = this.state;
    this.props.dispatch(geocodeRequest(''));
  }

  /* RENDER LOGIC */

  render() {
    return (
      <div>
        <button onClick={this.getGeocode}>Geocode</button>
        <input type='text' onChange={(e) => this.onLocationChange(e.target.value)} />
        { this.props.autocomplete.map((res, idx) => {
          return <div>{res.display_name}</div>
        })}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return { 
    geocode: getGeocode(state),
    autocomplete: getAutocomplete(state), 
  };
}

export default connect(mapStateToProps)(OSMPage);
