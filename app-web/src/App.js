import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from './pages/router/Layout';
import { useQuery } from "@tanstack/react-query";
import { useMenuStore, useAllItemStore } from "./store/menuReducer";
import axios from "axios";
//TODO call menu and put in store reduce loading time
const App = () => {
  // fetch data from backend

  const { menu, setMenu } = useMenuStore((state) => ({
    menu: state.menu,
    setMenu: state.setMenu,
  }));
  const getAllItem = useAllItemStore((state) => state.getAllItem);
  //TODO add menu version

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["WholeMenu"],
    () => {
      return axios.get("/api/category/").then((res) => {
        console.log("got menu");
        console.log(res.data);
        setMenu(res.data);
        return res.data;
      });
    }
  );
  console.log(menu);
  // const getMenu = () => {
  //   console.log("calling menu");
  //   axios.get("/api/category/").then((res) => res.data);
  // };
  // console.log(getMenu.data);

  useEffect(() => {
    console.log("getting all menu");
    getAllItem(menu);
  }, [menu, getAllItem]);
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
