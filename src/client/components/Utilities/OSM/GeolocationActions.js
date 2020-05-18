
export const GEOCODING_REQUEST = 'GEOCODING_REQUEST';
export const GEOCODING_SUCCESS = 'GEOCODING_SUCCESS';

export const AUTOCOMPLETE_REQUEST = 'ADDRESS_AUTOCOMPLETE_REQUEST'; 
export const AUTOCOMPLETE_SUCCESS = 'ADDRESS_AUTOCOMPLETE_SUCCESS'; 

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

/* GEOCODING */

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


