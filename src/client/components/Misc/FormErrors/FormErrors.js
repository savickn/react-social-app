
import React from 'react';
import PropTypes from 'prop-types';

import styles from './FormErrors.scss';

export class FormErrors extends React.Component {

  render() {
    return (
      //const cls = `${styles.form} ${(this.props.showAddGroup ? styles.appear : '')}`;
      <div className={styles['form-content']}>
        <label htmlFor="keys">
          <input className={styles['form-field']} id="keys" ref='keywords' />
          <a className={styles['search-submit-button']} href='#' onClick={this.getSearch}>Search</a>
        </label>
      </div>
    );
  }
}

FormErrors.propTypes = {
  showErrors: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
};

export default FormErrors;
