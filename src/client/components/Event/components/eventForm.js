

import React from 'react';
import PropTypes from 'prop-types';

import styles from './eventForm.scss';

const defaultState = {
    title: '',
    description: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '', 
    endTime: '',
    cost: 0, 
};

class EventForm extends React.Component {

  // instantiate component state
  constructor(props) {
    super(props);
    this.state = this.getFromLocalStorage() || defaultState;
  };

  // prob refactor handlers to be more DRY

  handleTitleChange = (se) => {
    this.setState({title: se.target.value});
  };

  handleDescriptionChange = (se) => {
    this.setState({description: se.target.value});
  };

  handleLocationChange = (se) => {
    this.setState({location: se.target.value});
  };

  handleStartDateChange = (se) => {
    this.setState({startDate: se.target.value});
  };

  handleStartTimeChange = (se) => {
    this.setState({startTime: se.target.value});
  };

  handleEndDateChange = (se) => {
    this.setState({endDate: se.target.value});
  };

  handleEndTimeChange = (se) => {
    this.setState({endTime: se.target.value});
  };

  handleCostChange = (se) => {
    this.setState({cost: se.target.value});
  };

  /* Helper Methods */ 

  getDateTime = (date, time) => {
    console.log('date --> ', date, ' , time --> ', time);
    const datetime = new Date(`${date}T${time}`);
    console.log('datetime --> ', datetime);
    return datetime;
  }

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
  
  // used to create new Event when form is submitted
  handleSubmit = () => {
    //se.preventDefault(); // only needed if using <form> tag
    const { title, description, location, startDate, startTime, endDate, endTime } = this.state;
    const start = this.getDateTime(startDate, startTime);
    const end = this.getDateTime(endDate, endTime);
    const eventArgs = {
      title, 
      description, 
      location, 
      start,
      end, 
      group: this.props.groupId,
      creator: this.props.creatorId, 
    };
    this.saveToLocalStorage();
    if (this.canBeSubmitted()) {
      this.props.createEvent(eventArgs);
      //this.resetState();
    }
  };

  // used to reset state
  resetState() {
    this.setState(defaultState);
  };

  // used to run validation for eventForm
  canBeSubmitted = () => {
    const { title, description, location, startDate, startTime, endDate, endTime } = this.state;
    return title.length > 0 && location.length > 0 && description.length > 0;
  };

  render() {
    return (
      <div id="eventForm">
        <h2 className={styles['form-title']}>Create a new event!</h2>
        <div className='form-field'>
          <label htmlFor="title"> Title: </label>
          <input type='text' id='title' className='form-control' value={this.state.title} onChange={this.handleTitleChange} />
        </div>
        <div className='form-field'>
          <label htmlFor="description"> Description: </label>
          <textarea id='description' className='form-control' value={this.state.description} onChange={this.handleDescriptionChange} />
        </div>
        <div className='form-field'>
          <label htmlFor='location'> Location: </label>
          <input type='text' id='location' className='form-control' value={this.state.location} onChange={this.handleLocationChange} />
        </div>
        <div className='form-field'>
          <label htmlFor='startTime'> Start Time: </label>
          <input type='date' id='startDate' className='form-control' value={this.state.startDate} onChange={this.handleStartDateChange} />
          <input type='time' id='startTime' className='form-control' value={this.state.startTime} onChange={this.handleStartTimeChange} />
        </div>
        <div className='form-field'>
          <label htmlFor='endTime'> End Time: </label>
          <input type='date' id='endDate' className='form-control' value={this.state.endDate} onChange={this.handleEndDateChange} />
          <input type='time' id='endTime' className='form-control' value={this.state.endTime} onChange={this.handleEndTimeChange} />
        </div>
        <button className='btn btn-md btn-default' onClick={this.handleSubmit}> Create Event </button>
      </div>
    );
  };
}

EventForm.propTypes = {
  creatorId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired, 
  createEvent: PropTypes.func.isRequired, 
};

export default EventForm;
