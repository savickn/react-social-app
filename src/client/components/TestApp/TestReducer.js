
export const INCREMENT = 'INCREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';

const initialState = {
  counter: 0
}

const TestReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}

export const getCount = state => state.test.counter;

export default TestReducer; 