
import React from 'react';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, NavDropdown, DropdownButton, MenuItem, Image} from 'react-bootstrap';
//import { FormattedMessage } from 'react-intl';

import styles from './Header.scss';

import appIcon from './sheep.png';
import beachIcon from './beach.png';

//import {isEmpty} from '../../../../util/utilFuncs';

export function Header(props, context) {
  /*const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );*/
  const isLoggedIn = props.authStatus === 'authenticated'; //isEmpty(props.currentUser) ? true : false;
  //console.log('isLoggedIn? --> ', isLoggedIn);
  //console.log('currentUser --> ', props.currentUser);

  const header = `${styles['header']}`;

  /*const header = `${styles['flex-navbar-background']}`;
  const navbar = `${styles['flex-navbar']} container`;
  const logo = `${styles['site-title']} ${styles['flex-logo']}`;
  const links = `${styles['flex-links']}`;
  const element = `${styles['flex-element']}`;*/

  const handleClick = (se) => {
    props.logOut();
  }

  return (
    <React.Fragment>
      <Navbar>
        <Nav>
          <LinkContainer to="/admin">
            <NavItem eventKey={1}> Admin </NavItem>
          </LinkContainer>
          {!isLoggedIn &&
            <LinkContainer to="/users/login">
              <NavItem eventKey={2}> Login </NavItem>
            </LinkContainer>
          }
          {!isLoggedIn &&
            <LinkContainer to="/users/new">
              <NavItem eventKey={3}> Create Account </NavItem>
            </LinkContainer>
          }
          {isLoggedIn &&
            <LinkContainer to="/groups">
              <NavItem eventKey={4}> Explore </NavItem>
            </LinkContainer>
          }
          {isLoggedIn &&
            <NavDropdown eventKey={7} title="Profile" id="basic-nav-dropdown">
              <LinkContainer to={`/users/${props.currentUser._id}`}>
                <MenuItem eventKey={7.1}> My Page </MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={7.3} onClick={handleClick}> Log Out </MenuItem>
            </NavDropdown>
          }
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
  //switchLanguage: PropTypes.func.isRequired,
  //intl: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  authStatus: PropTypes.string.isRequired,
};

export default Header;


/*

<React.Fragment>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Image src={appIcon} height="20" width="20" rounded />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/admin">
            <NavItem eventKey={1}> Admin </NavItem>
          </LinkContainer>
          {!isLoggedIn &&
            <LinkContainer to="/users/login">
              <NavItem eventKey={2}> Login </NavItem>
            </LinkContainer>
          }
          {!isLoggedIn &&
            <LinkContainer to="/users/new">
              <NavItem eventKey={3}> Create Account </NavItem>
            </LinkContainer>
          }
          {isLoggedIn &&
            <LinkContainer to="/groups">
              <NavItem eventKey={4}> Explore </NavItem>
            </LinkContainer>
          }
          {isLoggedIn &&
            <NavDropdown eventKey={7} title="Profile" id="basic-nav-dropdown">
              <LinkContainer to={`/users/${props.currentUser._id}`}>
                <MenuItem eventKey={7.1}> My Page </MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={7.3} onClick={handleClick}> Log Out </MenuItem>
            </NavDropdown>
          }
          <NavItem>
            <Image src={beachIcon} height="20" width="20" rounded />
          </NavItem>
        </Nav>
      </Navbar>
    </React.Fragment>

*/
