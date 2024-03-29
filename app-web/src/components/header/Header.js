import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Table,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
// import style from "./Header.module.scss";
import "./Header.scss";

import axios from "axios";
import { useUserInfoStore, useCartStore } from "../../store/userReducer";
import CartIcon from "../icons/CartIcon";
import useUserLoggedIn from "../../hooks/useIsUserLoggedIn";
const Header = () => {
  const { isLogin, setLogin, user, setUser } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    setLogin: state.setLogin,
    user: state.user,
    setUser: state.setUser,
  }));

  const {
    cart: { cartItems },
    setCart,
    cleanCart,
  } = useCartStore((state) => ({
    cart: state.cart,
    setCart: state.setCart,
  }));

  const logout = async () => {
    setLogin(false);
    setUser(null);
    localStorage.removeItem("cart");
    await axios
      .get("/api/loggedInUser/logout", null, { withCredentials: true })
      .then((res) => console.log(res.data));
    window.location.href = "/";
  };

  const isLoggedIn = useUserLoggedIn();
  if (isLoggedIn.loading) {
    return <div>Loading </div>;
  }
  return isLoggedIn.userRole <= 1 ? (
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
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
                {isLogin && (
                  <Nav.Link as={NavLink} to="/orders">
                    orders
                  </Nav.Link>
                )}
                <Dropdown align="end">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <CartIcon />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="drop-down-box">
                    <ListGroup>
                      {Object.keys(cartItems).map((itemOptionId) => (
                        <ListGroup.Item key={itemOptionId}>
                          <Row>
                            <Col>{cartItems[itemOptionId].quantity}</Col>
                            <Col>{cartItems[itemOptionId].itemName}</Col>
                            <Col>
                              {cartItems[itemOptionId].optionName !== "base" &&
                                cartItems[itemOptionId].optionName}
                            </Col>
                            <Col>{cartItems[itemOptionId].price}</Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/checkout">
                      <Button variant="primary">Check out</Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <DropdownButton type="button" className="btn ">

              </DropdownButton> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    ) : (
      <header>
        <Navbar className="py-3" bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              China Garden
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-container">
                <Nav.Link as={NavLink} to="admin">
                  Admin panel
                </Nav.Link>
                <Nav.Link as={NavLink} to="/edit-menu">
                  Edit menu
                </Nav.Link>
                <Nav.Link as={NavLink} to="/sales">
                  Sales
                </Nav.Link>
                <button type="button" className="btn btn-link" onClick={logout}>
                  Logout
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  };

export default Header;
