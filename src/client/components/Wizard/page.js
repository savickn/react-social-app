
import React from 'react';
import PropTypes from 'prop-types';

//import md5 from 'crypto-js/md5';
//import base64 from 'crypto-js/enc-base64';

// represents a single page within a Wizard
class WizardPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      //id: md5(props.children).toString(base64), 
      isComplete: false, // tracks state of
    };
  }

  componentDidMount() {
    if(this.props.onEnter) this.props.onEnter();
  }

  componentWillUnmount() {
    if(typeof window !== undefined) {
      //localStorage.setItem(this.state.id, this.props.children);
    }
    if(this.props.onExit) this.props.onExit();
  }

  /* Component Logic */

  // used to skip page if user clicks 'Skip' button by setting 'isComplete' to 'true' 
  skip = () => {
    if(this.props.isSkippable) {
      this.setState({isComplete: true});
    }
  }

  // 
  continue = () => {

  }

  /* UI render methods */

  getChildrenComponents = () => {
    if(typeof this.props.children === Array) {
      return this.props.children;
    } else {
      return [this.props.children];
    }
  } 

  render() {
    const children = this.getChildrenComponents();

    return (
      <div>
        {children.map((child) => {
          return React.cloneElement(child, { });
        })}
        <button onClick={() => this.skip()}>Skip</button>
        <button onClick={() => this.continue()}>Continue</button>
      </div>
    );
  }
}

//{React.cloneElement(this.props.children, { loggedIn: this.state.loggedIn })}

WizardPage.defaultProps = {
  shouldValidate: true, // enables validation of child form and prevents wizard progression if validation fails
  isSkippable: false, // allows user to optionally skip this page
  isReturnable: true, // allows user to return to this page
};

WizardPage.propTypes = {
  children: PropTypes.object.isRequired,
  validationFunc: PropTypes.func.isRequired, // used to check that this page is complete


  onEnter: PropTypes.func, // represents a function that should be called when this page is navigated to
  onExit: PropTypes.func, // represents a function that should be called when this page is navigated away from
  pageName: PropTypes.string.isRequired, 
  
  pageNum: PropTypes.number, 
  pageCount: PropTypes.number, 
};

export default WizardPage;
