
import React from 'react';

import styles from './StylesTestPage.scss';

console.log('stylesTest styles --> ', styles);


class StylesTest extends React.Component {
  render() {
    return (
      <div>
        <div className='global-blue-text'>global blue text</div>
        <div className={styles.modularGreenText}>modular green text</div>
        <div className={styles.postcss}>postcss yellow</div>
        <div className={styles.sass}>scss brown</div>
      </div>
    )
  }
}

export default StylesTest;
