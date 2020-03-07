
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';
export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';

export const changePage = (id, page) => {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: {
      id,
      page
    }
  }
}

export const changeSize = (id, size) => {
  return {
    type: CHANGE_PER_PAGE,
    payload: {
      id,
      size
    }
  }
}
