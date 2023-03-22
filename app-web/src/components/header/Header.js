import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import style from "./Header.module.scss";
import "./Header.scss";
const Header = () => {
  return (
    <header>
      <Navbar className="py-3" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            China Garden
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-container">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/menu">
                Menu
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
