
const initialState = {
  formData: null,
  isComplete: false,
};

const WizardReducer = (state = initialState, action) => {
  switch(action.type) {
    //case 1:
    //  return;
    default: 
      return state;
  }
}

export const getFormData = (state) => state.formData;
export const isComplete = (state) => state.isComplete;


export default WizardReducer;
