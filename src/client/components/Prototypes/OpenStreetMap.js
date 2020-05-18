
import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { getGeocode, getAutocomplete, getLocation,  } from '../Utilities/OSM/GeolocationReducer';
import { geocodeRequest, autocompleteRequest, reverseRequest, } from '../Utilities/OSM/GeolocationActions';

class OSMPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      coords: {},  
      location: '', 
    };
  }

  componentDidMount() {
    // get user's location
    navigator.geolocation.getCurrentPosition((loc) => {
      console.log('coords --> ', loc);
      this.setState({ coords: {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude, 
      }})
    });
  }

  /* EVENT HANDLERS */

  // used to update 'location' in 'this.state'
  onLocationChange = debounce((location) => {
    this.setState({ location }, () => {
      this.getAutocomplete();
    })
  }, 500)

  // used to convert HTML5 geolocation coords to OSM location
  reverseGeocode = () => {
    const { coords } = this.state;
    this.props.dispatch(reverseRequest(coords));
  }

  // used to provide search suggestions based on location name
  getAutocomplete = () => {
    const { location } = this.state;
    const country_code = this.props.location.address ? this.props.location.address.country_code : null;

    this.props.dispatch(autocompleteRequest({ location, country_code }));
  }

  // used to convert location name (e.g. Etobicoke) to lat/lon coords
  getGeocode = () => {
    const { location } = this.state;
    this.props.dispatch(geocodeRequest(''));
  }

  /* RENDER LOGIC */

  render() {
    return (
      <div>
        <button onClick={this.reverseGeocode} >Reverse</button>
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
    location: getLocation(state), 
  };
}

export default connect(mapStateToProps)(OSMPage);
