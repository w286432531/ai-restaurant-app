import React from "react";
import { Container } from "react-bootstrap";
import "./UserForm.scss";
import Login from "../../components/authentication/login/Login";
import Register from "../../components/authentication/register/Register";
const UserForm = (prop) => {

  return (
    <Container className="user-form-container text-center">
      <h1>{prop.page}</h1>
      {prop.page === "login" && <Login />}
      {prop.page === "register" && <Register />}
    </Container>
  );
};

export default UserForm;
