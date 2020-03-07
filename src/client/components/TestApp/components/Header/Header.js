
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import styles from './Header.scss';

export function Header(props) {

  const isLoggedIn = props.authStatus === 'authenticated'; //isEmpty(props.currentUser) ? true : false;

  const handleClick = (se) => {
    //props.logOut();
  }

  return (
    <React.Fragment>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">My React App</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/admin">
            <NavItem eventKey={1}> Admin </NavItem>
          </LinkContainer>
          {!isLoggedIn &&
            <LinkContainer to="/users/login">
              <NavItem eventKey={2}>Login</NavItem>
            </LinkContainer>
          }
          {!isLoggedIn &&
            <LinkContainer to="/users/new">
              <NavItem eventKey={3}>Create Account</NavItem>
            </LinkContainer>
          }
          {isLoggedIn &&
            <LinkContainer to="/groups">
              <NavItem eventKey={4}>Explore</NavItem>
            </LinkContainer>
          }
          <LinkContainer to="/todos">
            <NavItem eventKey={5}> Todos </NavItem>
          </LinkContainer>
          <LinkContainer to="/about">
            <NavItem eventKey={6}> About </NavItem>
          </LinkContainer>
          {isLoggedIn &&
            <NavDropdown eventKey={7} title="Profile" id="basic-nav-dropdown">
              <LinkContainer to={`/users/${props.currentUser._id}`}>
                <MenuItem eventKey={7.1}>My Page</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/users/${props.currentUser._id}/settings`}>
                <MenuItem eventKey={7.2}>Settings</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={7.3} onClick={handleClick}>Log Out</MenuItem>
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
  currentUser: PropTypes.object.isRequired,
  authStatus: PropTypes.string.isRequired,
};

export default withRouter(Header);


/*
  <div className={header}>
    <div className={navbar}>
      <div className={logo}>
        <Link to="/" ></Link>
      </div>
      <div className={links}>
        <div className={element}>
          <Link to='/admin'>Admin</Link>
        </div>
        {!isLoggedIn &&
          <div className={element}>
            <Link to="/users/login">Login</Link>
          </div>
        }
        {!isLoggedIn &&
          <div className={element}>
            <Link to="/users/new">Create Account</Link>
          </div>
        }
        {isLoggedIn &&
          <div className={element}>
            <Link to="/groups">Explore</Link>
          </div>
        }
        <div>
          <Link to="/todos">Todos</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        {isLoggedIn &&
          <div className={element}>
            <DropdownButton title='Profile' id='dropdown-basic-1'>
              <LinkContainer to={`/users/${props.currentUser._id}`}>
                <MenuItem eventKey="1">My Page</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/users/${props.currentUser._id}/settings`}>
                <MenuItem eventKey="2">Settings</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey="3" onClick={handleClick}>Log Out</MenuItem>
            </DropdownButton>
          </div>
        }
      </div>
    </div>
  </div>
*/



//<li><Link to={`/users/${props.currentUser._id}`}>My Page</Link></li>

/*<div className={element}>
  <div className='dropdown'>
    <a className='dropdown-toggle' data-toggle='dropdown'>Profile</a>
    <ul className='dropdown-menu'>
      <li>Settings</li>
      <li><a onClick={handleClick}>Log Out</a></li>
    </ul>
  </div>
</div>*/


/*
return (
  <div className={styles.header}>
    <div className={styles['language-switcher']}>
      <Link to="/test">Go to Test</Link>
      <Link to="/users/login">Login</Link>
      <Link to="/users/new">Create Account</Link>
      <ul>
        <li><FormattedMessage id="switchLanguage" /></li>
        {languageNodes}
      </ul>
    </div>
    <div className={styles.content}>
      <h1 className={styles['site-title']}>
        <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
      </h1>
      {
        context.router.isActive('/', true)
          ? <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
          : null
      }
    </div>
  </div>
);
*/
