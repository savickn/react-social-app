
import {
  GEOCODING_SUCCESS,
  AUTOCOMPLETE_SUCCESS, 
  REVERSE_SUCCESS, 
} from './GeolocationActions';

const initialState = {
  lookup: {}, // represents geocode search result
  autocomplete: [], // represents autocomplete results
  location: {}, // represents reverse lookup results
}

const GeolocationReducer = (state=initialState, action) => {
  switch(action.type) {
    case GEOCODING_SUCCESS: 
      return {
        ...state, 
        lookup: action.coords, 
      }
    case AUTOCOMPLETE_SUCCESS:
      return {
        ...state, 
        autocomplete: [...action.data], 
      }
    case REVERSE_SUCCESS:
      return {
        ...state, 
        location: action.data
      }
    default:
      return state;
  }
}

export const getGeocode = (state) => state.osm.geocode;
export const getAutocomplete = (state) => state.osm.autocomplete;
export const getLocation = (state) => state.osm.location;

export default GeolocationReducer;
