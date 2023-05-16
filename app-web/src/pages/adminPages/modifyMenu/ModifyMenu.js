import React, { useEffect, useState } from "react";
import { useUserInfoStore } from "../../../store/userReducer";
import { useOptionStore, useIngredientStore } from "../../../store/menuReducer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import CreateItem from "../../../components/modifyItem/createItem/CreateItem";
import EditItem from "../../../components/modifyItem/editItem/EditItem";

const ModifyMenu = () => {
  const { isLogin, user } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));
  const setOptions = useOptionStore((state) => state.setOptions);
  const setIngredients = useIngredientStore((state) => state.setIngredients);
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getOptionsIngredients"],
    () => {
      return axios.get("/api/item/modify-item").then((res) => {
        // console.log("got data");
        // console.log(res.data);
        // console.log(res.data.options);
        setOptions(res.data.options);
        // console.log(res.data.ingredients);
        setIngredients(res.data.ingredients);
        return res.data;
      });
    }
  );

  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("edit");
  useEffect(() => {
    // if (!isLogin || !user || user.roleId === 1) {
    //   navigate("/");
    // }
  }, [user, isLogin, navigate]);
  return (
    <Container>
      <Row>
          <Tabs
            id="controlled-tab-example"
            activeKey={viewMode}
            onSelect={(k) => setViewMode(k)}
            className="mb-3"
          >
            <Tab eventKey="create" title="Create a item">
            </Tab>
            <Tab eventKey="edit" title="Modify a item">
            </Tab>
          </Tabs>
      </Row>
      <hr />
      <Row>
        {viewMode === "create" && <CreateItem />}
        {viewMode === "edit" && <EditItem />}
      </Row>
    </Container>
  );
};

export default ModifyMenu;
