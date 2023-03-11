
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

  buildStyles() {
    const { contentWidth, maxWidth, } = this.props;
    let res = {};
    if(contentWidth) res['width'] = contentWidth;
    if(maxWidth) res['max-width'] = maxWidth;
    return res;
  }
  
  render() {
    //const modalCss = this.props.isVisible ? '' : '';
    const { contentWidth, } = this.props;

    const propsStyles = this.buildStyles();

    return (
      <div>
        { this.props.isVisible && 
          <div className={styles['modal']} ref={this.modalRef} onClick={this.hideModal}>
            <div className={styles['modal-content']} style={propsStyles}>
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
  contentWidth: PropTypes.string, // controls the contentArea width (defaults to 80%)
};

export default Modal;


