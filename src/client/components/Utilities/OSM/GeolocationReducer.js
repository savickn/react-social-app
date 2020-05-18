
import {
  GEOCODING_SUCCESS,
  AUTOCOMPLETE_SUCCESS, 
} from './GeolocationActions';

const initialState = {
  geocode: '',
  autocomplete: [], 
}

const GeolocationReducer = (state=initialState, action) => {
  switch(action.type) {
    case GEOCODING_SUCCESS: 
      return {
        ...state, 
        geocode: action.coords, 
      }
    case AUTOCOMPLETE_SUCCESS:
      return {
        ...state, 
        autocomplete: [...action.data], 
      }
    default:
      return state;
  }
}

export const getGeocode = (state) => state.osm.geocode;
export const getAutocomplete = (state) => state.osm.autocomplete;

export default GeolocationReducer;
