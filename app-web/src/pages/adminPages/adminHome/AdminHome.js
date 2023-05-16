import React, { useEffect } from "react";
import { useUserInfoStore } from "../../../store/userReducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col,Card } from "react-bootstrap";
const AdminHome = () => {
  const { isLogin, user } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));
  const navigate = useNavigate();
  useEffect(() => {
    // if (!isLogin || !user || user.roleId === 1) {
    //   navigate("/");
    // }
  }, [user, isLogin, navigate]);

  return (
    <Container>
      <h1>Welcome to admin home</h1>
      <br />
      <Row>
        <Col sm={12} md={6} lg={4}>
          <Card>
            <Link to={`/edit-menu`}>Edit Menu</Link>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <Card>
            <Link to={`/Sales`}>View Sales</Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
