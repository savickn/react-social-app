
import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal.scss';

class Modal extends React.Component {
  
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  hideModal = (se) => {
    //console.log('modalClick --> ', se.target);
    //console.log('modalRef --> ', this.modalRef.current);
    if(se.target === this.modalRef.current) {
      this.props.close();
    }
  }
  
  render() {
    //const modalCss = this.props.isVisible ? '' : '';
    return (
      <div>
        { this.props.isVisible && 
          <div className={styles['modal']} ref={this.modalRef} onClick={this.hideModal}>
            <div className={styles['modal-content']}>
              {this.props.children}
            </div>
          </div>
        }
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;


