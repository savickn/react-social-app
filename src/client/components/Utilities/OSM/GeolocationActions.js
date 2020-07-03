
export const GEOCODING_REQUEST = 'GEOCODING_REQUEST';
export const GEOCODING_SUCCESS = 'GEOCODING_SUCCESS';

export const AUTOCOMPLETE_REQUEST = 'ADDRESS_AUTOCOMPLETE_REQUEST'; 
export const AUTOCOMPLETE_SUCCESS = 'ADDRESS_AUTOCOMPLETE_SUCCESS'; 
export const CLEAR_AUTOCOMPLETE = 'CLEAR_AUTOCOMPLETE';


export const REVERSE_REQUEST = 'REVERSE_REQUEST';
export const REVERSE_SUCCESS = 'REVERSE_SUCCESS';



/* ADDRESS AUTOCOMPLETE */

export const autocompleteRequest = (query) => {
  return {
    type: AUTOCOMPLETE_REQUEST, 
    query, 
  }
}

export const autocompleteSuccess = (data) => {
  return {
    type: AUTOCOMPLETE_SUCCESS,
    data, 
  }
}

export const clearAutocomplete = () => {
  return {
    type: CLEAR_AUTOCOMPLETE,
  }
}

/* GEOCODING --> convert name like 'Toronto' into 'lat/long' coords */

export const geocodeRequest = (queryString) => {
  return {
    type: GEOCODING_REQUEST,
    queryString, 
  }
}

export const geocodeSuccess = (coords) => {
  return {
    type: GEOCODING_SUCCESS,
    coords, 
  }
}

/* REVERSE GEOCODING -->  */

export const reverseRequest = (coords) => {
  return {
    type: REVERSE_REQUEST,
    coords, 
  }
}

export const reverseSuccess = (data) => {
  return {
    type: REVERSE_SUCCESS,
    data, 
  }
}
