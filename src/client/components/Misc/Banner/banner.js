
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './banner.scss';

import icon from '../../../shared/header-icon.svg';
//import icon2 from '../../../shared/bicycle32.png';
//import icon3 from '../../../shared/bicycle512.png';

export class BannerComponent extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">My React App</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/todos">
              <NavItem eventKey={1}> Todos </NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={2}> About </NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
              <MenuItem eventKey={3.5}>Other Link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Image src={icon} height="200" width="200" rounded />
        <p className={styles['random-paragraph']}>WOrd is bond</p>
      </React.Fragment>
    )
  }
}

export default BannerComponent;

/*
<Image src={icon} height="200" width="200" rounded />
<Image src={icon2} height="32" width="32" rounded />
<Image src={icon3} height="512" width="512" rounded />
*/


/*
<h1 className={styles['banner-header']}> 
  <Link to="/">My React App</Link> 
</h1>
<Link to='/todos' className={styles['banner-link']}>ToDo's</Link>
<Link to='/about' className={styles['banner-link']}>About</Link>
*/