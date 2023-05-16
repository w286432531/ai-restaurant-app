import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotFoundError, ServerError } from '../../components/errors'
import { useUserInfoStore } from "../../store/userReducer";
import { useNavigate } from "react-router-dom";
import mainImg from "../../images/chinese-food-inthed-1120x558-1.webp";
const Home = () => {
  const { isLogin, user } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));
  const navigate = useNavigate();
  if (user && isLogin && user.roleId > 1) {
    navigate('/admin');
  }
  return (
    <Container>
      <Row>
        <Col xl={8} lg={12}>
          <img className="img-fluid" src={mainImg} alt="" />
        </Col>
        <Col className="center-text">
          <h2>Try our Today's special General Tso Chicken </h2>
          <p>
            Looking for a delicious and satisfying meal? Look no further than
            our General Tso Chicken! For a limited time only, we're offering a
            special promotion on this classic Chinese dish. Our General Tso
            Chicken is made with tender chunks of juicy chicken, crispy
            vegetables, and a flavorful sauce that's both sweet and spicy. At
            our restaurant, we use only the freshest ingredients to ensure that
            our dishes are bursting with flavor. And our General Tso Chicken is
            no exception. Whether you're a fan of spicy food or you prefer a
            milder taste, our General Tso Chicken is sure to satisfy your
            cravings. So come on down to our restaurant today and take advantage
            of our special promotion on General Tso Chicken. You won't be
            disappointed!
          </p>
          <Button variant="warning" as={Link} to="/menu">
            Go to menu
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
