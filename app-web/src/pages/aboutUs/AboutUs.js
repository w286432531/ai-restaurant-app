import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import mainImg from "../../images/pexels-prince-photos-3054690.jpg";
const AboutUs = () => {
  return (
    <Container>
      <Row>
        <Col xl={8} lg={12}>
          <img className="img-fluid" src={mainImg} alt="" />
        </Col>
        <Col className="center-text">
          <p>
            China Garden is a Chinese restaurant that offers an authentic dining
            experience to its customers. The restaurant is located in a vibrant
            part of the city, and its interior is tastefully decorated with
            traditional Chinese elements, such as lanterns and ornate artwork.
            </p>
            <p>
            As you step inside China Garden, you'll be greeted by the
            tantalizing aromas of freshly cooked Chinese cuisine. The
            restaurant's menu features a wide range of dishes, from classic
            favorites like Kung Pao Chicken and Moo Shu Pork to more exotic
            options like Ma Po Tofu and Cantonese Lobster. All of the dishes are
            prepared using fresh, high-quality ingredients and traditional
            Chinese cooking techniques.
            </p>
            <p>China Garden is the perfect place to
            enjoy a meal with friends and family or to celebrate a special
            occasion. The restaurant offers a warm and welcoming atmosphere, and
            the staff is friendly and attentive. Whether you're in the mood for
            a quick lunch or a leisurely dinner, China Garden is sure to satisfy
            your cravings for delicious Chinese food.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default AboutUs;
