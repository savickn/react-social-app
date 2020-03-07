
import React from 'react';

import Modal from '../Modal/modal';
import WizardHub from '../Wizard/wizard';
import WizardPage from '../Wizard/page';
import Inner from './InnerWizardComponent';

class ModalWizardPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      sum: 0,
    };
  }

  /* Modal Logic */

  openModal = () => {
    this.setState({modalVisibility: true});
  }

  closeModal = () => {
    this.setState({modalVisibility: false});
  }

  /* Wizard Logic */

  f1 = () => {
    console.log('f1');
    this.setState({sum: this.state.sum + 1});
  } 
  
  f2 = () => {
    console.log('f2');
    this.setState({sum: this.state.sum + 2});
  }

  f3 = () => {
    console.log('f3');
    this.setState({sum: this.state.sum + 3});
  }

  complete = () => {
    console.log('complete');
  }
  
  render() {
    return (
      <div>
        <Modal isVisible={this.state.modalVisibility} close={this.closeModal}>
          <WizardHub completedFunc={this.complete}>
            <WizardPage>
              <Inner content="Add 1" callback={this.f1} />
            </WizardPage>
            <WizardPage>
              <Inner content="Add 2" callback={this.f2} />
            </WizardPage>
            <WizardPage>
              <Inner content="Add 3" callback={this.f3} />
            </WizardPage>
          </WizardHub>
        </Modal>
        <button onClick={this.openModal}>Open Modal</button>
      </div>
    );
  }
}

export default ModalWizardPage;
