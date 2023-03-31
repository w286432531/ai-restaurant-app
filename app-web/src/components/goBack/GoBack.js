import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const GoBack = ({ message }) => {
  const navigate = useNavigate();
  const redirect = () => {
    const previousPage = document.referrer;
    // check if the previous page is on your site
    if (previousPage.includes(window.location.origin)) {
      // redirect user to the previous page
      navigate(-1);
    } else {
      // redirect user to the home page
      navigate("/");
    }
  };
  return (
    <Container>
      <h2>{message}</h2>
      <button onClick={redirect}>Go Back</button>
    </Container>
  );
};

export default GoBack;
