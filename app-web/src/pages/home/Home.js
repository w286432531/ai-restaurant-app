import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { NotFoundError, ServerError } from '../../components/errors'

const Home = () => {
  return (
    <Container>
      <Card>
        Hello This is home
        <Button>click here</Button>
      </Card>
    </Container>
  );
};
export default Home;
