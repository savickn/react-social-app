import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AdminPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <Link to="/test">Go to Test</Link> <br />
        <Link to="/router4">Go to Routerv4</Link> <br />
        <Link to="/nested">Go to Nested Views</Link> <br />
        <Link to="/panels">Go to Multiple Views</Link> <br />
        <Link to="/todos"> Todos </Link> <br />
        <Link to="/modalwizard">Modal Wizard</Link> <br />
        <Link to="/stylesTest">Styles</Link> <br />
        <Link to="/openstreetmap">OpenStreetMap</Link> <br />
        

        <Link to="/commentTest">Comment Test</Link>
        
      </div>
    );
  }
}

export default AdminPage;
