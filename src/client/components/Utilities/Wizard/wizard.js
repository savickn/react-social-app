
import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import styles from './wizard.scss';

// used to manage WizardPages
class Wizard extends React.Component {
  
  constructor(props) {
    super(props);
    console.log('wizard props --> ', props);
    this.state = {
      currentPage: 1, // represents current page
      pageCount: props.children.length,
      isComplete: false, // used to represent whether or not the wizard is complete
    };
  }



  /* HELPER METHODS */

  // used to check if the next WizardPage is accessible
  validateNext = () => {
    const currentIdx = this.state.currentPage - 1;
    const currentElem = this.props.children[currentIdx];
    
    return currentElem.isComplete || currentElem.isSkippable;
  }


  hasPrevious = () => {
    return this.state.currentPage > 1;
  }

  hasNext = () => {
    return this.state.currentPage < this.state.pageCount;
  }

  previous = () => {
    const { currentPage } = this.state;
    if(currentPage <= 1) return;
    let idx = currentPage - 1;
    this.setState({currentPage: idx}, () => { });
  }

  next = () => {
    const { currentPage, pageCount } = this.state;
    if(currentPage >= pageCount) return;
    let idx = currentPage + 1;
    this.setState({currentPage: idx}, () => { });
  }

  goTo = (idx) => {
    console.log('wizard idx --> ', idx);
    const { currentPage, pageCount } = this.state;
    if(idx === currentPage || idx < 1 || idx > pageCount) return;
    this.setState({currentPage: idx}, () => { });
  }

  // needs to retreive data from children somehow??
  handleSubmit = () => {
    for(let page of this.props.children) {
      if(!page.isComplete) return;
    }
    this.props.completedFunc();
  }

  /* UI functions */
  
  getCurrentPage = () => {
    console.log('wizard children --> ', this.props.children);
    return this.props.children[this.state.currentPage - 1]
  }

  render() {
    const nums = Array.from(Array(this.state.pageCount).keys());
    
    const currentPage = this.getCurrentPage();
    // try to disable forward/back if they are not available
    const hasPrevious = this.hasPrevious();
    const hasNext = this.hasNext();

    return (
      <div>
        {currentPage}
        <Nav bsStyle='pills' activeKey={this.state.currentPage}>
          <NavItem onSelect={() => this.previous()}><i className='glyphicon glyphicon-chevron-left'></i></NavItem>
          {
            this.props.children.map((page, idx) => {
              //const cls = page.state.isComplete ? styles['pageComplete'] : styles['pageIncomplete'];
              return (<NavItem /*className={cls}*/ key={idx} eventKey={idx} /*onSelect={() => this.goTo(num+1)}*/>{page.props.name}</NavItem>);
            })
          }
          <NavItem onSelect={() => this.next()}><i className='glyphicon glyphicon-chevron-right'></i></NavItem>
        </Nav>
      </div>
    );
  }
}

Wizard.propTypes = {
  children: PropTypes.array.isRequired,
  completedFunc: PropTypes.func.isRequired, // called when the entire Wizard is complete
};

export default Wizard;
