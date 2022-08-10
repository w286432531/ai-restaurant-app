import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import './Header.module.scss';
import './Header.scss';
const Header = () => {
  return (
    <header>
      <Navbar className="py-3" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Restaurant
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/menu">
                menu
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;