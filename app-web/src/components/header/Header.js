import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import style from "./Header.module.scss";
import "./Header.scss";
import axios from "axios";
import {useUserInfoStore} from "../../store/userReducer";
import CartIcon from "../icons/CartIcon";
const Header = () => {
  const { isLogin, setLogin } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    setLogin: state.setLogin,
  }));

  const logout = async () => {
    setLogin(false);
    await axios.get("/api/loggedInUser/logout", null, { withCredentials: true }).then((res) => console.log(res.data));
    window.location.href = "/";
  };
  console.log("is login", isLogin);
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
              {!isLogin ? (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <button type="button" className="btn btn-link" onClick={logout}>
                  Logout
                </button>
              )}
              <button type="button" className="btn ">
                <CartIcon/>
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
