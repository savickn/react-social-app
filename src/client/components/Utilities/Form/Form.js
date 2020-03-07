
import React from 'react';


const defaultState = {
  formId: 'dfasdf',
  complete: false, 
};

class Form extends React.Component {

  /* Lifecycle hooks */
  constructor(props) {
    super(props);
    this.state = this.getFromLocalStorage() || defaultState;
  }

  // should save state if incomplete (or delete state if complete)
  componentWillUnmount() {
    this.state.complete ? this.emptyLocalStorage() : this.saveToLocalStorage();
  }

  /* class logic */

  emptyLocalStorage = () => {
    if(typeof window !== undefined) {
      localStorage.removeItem(`${this.props.creatorId}-${this.props.groupId}-event`);
    }
  }

  getFromLocalStorage = () => {
    if(typeof window !== undefined) {
      return JSON.parse(localStorage.getItem(`${this.props.creatorId}-${this.props.groupId}-event`));
    } 
  }

  saveToLocalStorage = () => {
    if(typeof window !== undefined) {
      localStorage.setItem(`${this.props.creatorId}-${this.props.groupId}-event`, JSON.stringify(this.state));
    }
  }

  /* UI Methods */

  render() {
    return <div></div>
  }
}


export default Form;
