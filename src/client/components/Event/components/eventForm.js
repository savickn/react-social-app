

import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

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

  //
  selectLocation = (loc) => {
    console.log('select location --> ', loc);
    this.setState({ location: loc });
  }

  handleLocationChange = debounce((loc) => {
    console.log('locationChange --> ', loc);
    this.props.getSuggestions(loc);
  }, 1000);


  /* Helper Methods */ 

  getDateTime = (date, time) => {
    console.log('date --> ', date, ' , time --> ', time);
    const datetime = new Date(`${date}T${time}`);
    console.log('datetime --> ', datetime);
    return datetime;
  }

  // used to remove saved form data when clicking reset
  emptyLocalStorage = () => {
    if(typeof window !== undefined) {
      localStorage.removeItem(`${this.props.creatorId}-${this.props.groupId}-event`);
    }
  }

  // used to load saved form data 
  getFromLocalStorage = () => {
    if(typeof window !== undefined) {
      return JSON.parse(localStorage.getItem(`${this.props.creatorId}-${this.props.groupId}-event`));
    } 
  }

  // used to save form data when creating or leaving form ??
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
    //this.saveToLocalStorage();
    this.props.createEvent(eventArgs);
  };

  // used to reset state
  reset = () => {
    this.setState(defaultState, () => {
      this.emptyLocalStorage();
    });
  };

  // used to run validation for eventForm
  canBeSubmitted = () => {
    const { title, description, location, startDate, startTime, endDate, endTime } = this.state;
    return title.length > 0 && location.length > 0 && description.length > 0;
  };

  render() {
    const { errors } = this.props;

    return (
      <div id="eventForm" className={styles.eventForm}>
        { errors && 
          (<div className='errors'>
            { errors.length > 0 && errors.map((err) => {
              return (
              <div className={styles.error}>
                {err}
              </div>
              );
            })
            }
          </div>)
        }
        <div className={styles.field}>
          <label htmlFor="title"> Title: </label>
          <input type='text' id='title' className='form-control' value={this.state.title} onChange={this.handleTitleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="description"> Description: </label>
          <textarea id='description' className={`form-control vert-resize-only`} rows='3'
            value={this.state.description} onChange={this.handleDescriptionChange} />
        </div>
        
        { /*
        <div className='form-field'>
          <label htmlFor='location'> Location: </label>
          <input type='text' id='location' className='form-control' value={this.state.location} onChange={this.handleLocationChange} />
        </div>
        */ }
        
        <div className={styles.field}>
          <label htmlFor='location'> Location:</label>
          <input type='text' onChange={(e) => this.handleLocationChange(e.target.value)} id="location" className='form-control' />
        </div>
        {this.props.locationSuggestions.map((l, idx) => {
          return (
            <div className={`${styles.suggestion} ${this.state.location.place_id === l.place_id ? styles.selected : ''}`} 
              onClick={() => this.selectLocation(l)}>
                {l.display_name}
            </div>
          );
        })}


        <div className={styles.field}>
          <label htmlFor='startTime'> Start Time: </label>
          <input type='date' id='startDate' className='form-control' value={this.state.startDate} onChange={this.handleStartDateChange} />
          <input type='time' id='startTime' className='form-control' value={this.state.startTime} onChange={this.handleStartTimeChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor='endTime'> End Time: </label>
          <input type='date' id='endDate' className='form-control' value={this.state.endDate} onChange={this.handleEndDateChange} />
          <input type='time' id='endTime' className='form-control' value={this.state.endTime} onChange={this.handleEndTimeChange} />
        </div>
        <div className={styles.submit}>
          <button className={`btn btn-md btn-default`} onClick={this.reset}> Reset </button>
          <button className={`btn btn-md btn-default`} onClick={this.handleSubmit}> Create Event </button>
        </div>
      </div>
    );
  };
}

EventForm.propTypes = {
  evt: PropTypes.object, // for updating existing objects

  creatorId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired, 
  createEvent: PropTypes.func.isRequired, 

  getSuggestions: PropTypes.func.isRequired, // func to query osm for suggestions when user input changes
  locationSuggestions: PropTypes.array.isRequired, // an array of osm objects

  errors: PropTypes.array, 
};

export default EventForm;
