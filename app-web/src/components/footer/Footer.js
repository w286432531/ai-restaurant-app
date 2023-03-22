import React from "react";
import {  Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Navbar variant="light" className="footer-flex">
              <h6>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </h6>
              <h6>
                <Nav.Link as={Link} to="/about-us">
                  About Us
                </Nav.Link>
              </h6>
              <h6>
                <Nav.Link as={Link} to="/menu">
                  Menu
                </Nav.Link>
              </h6>
            </Navbar>
          </Col>
          <Col>
            <div className="footer-flex">
              <h3>Store Hours</h3>
              <p>Mon:Closed</p>
              <p>Sun-Tues: 11:00 - 21:00</p>
              <p>Fri-Sat: 11:00 - 22:00</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;