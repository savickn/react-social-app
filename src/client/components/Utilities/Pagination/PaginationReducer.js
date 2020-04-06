
import {
  CHANGE_CURRENT_PAGE, CHANGE_PER_PAGE, 
} from './PaginationActions';

import { updateByObjectId, removeByObjectId, matchByObjectId, } from '../../../util/utilFuncs';

/* should structure pages as shown below
{
  id: '',
  currentPage: '',
  pageSize: '',
  collectionSize: '',
}*/

const initialState = {
  // can maybe use a dictionary instead of array (e.g. id: {currentPage/etc} )
  default: {
    currentPage: 1,
    pageSize: 5
  },
  pages: [

  ]
}

const PaginationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_PAGE_FINISHED':
      const modifiedPages = updateByObjectId(state.pages, action.payload.page);
      return {...state, pages: modifiedPages};

    default:
      return state;
  }
}

//export const getCurrentPage = (state) => state.page.currentPage;
//export const getPageSize = (state) => state.page.pageSize;

// for array
export const getCollectionById = (state, id) => state.page.pages.filter(page => page.id === id)[0] || state.page.default;
// for object
//export const getCollectionById (state, id) => state.page.pages[id] || {};


export default PaginationReducer;
