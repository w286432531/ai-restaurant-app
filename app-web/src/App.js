import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./pages/router/Layout";
import { useQuery } from "@tanstack/react-query";
import { useMenuStore, useAllItemStore } from "./store/menuReducer";
import useUserInfoStore from "./store/authReducer";
import axios from "axios";
//TODO call menu and put in store reduce loading time
const App = () => {
  // fetch data from backend
  const { isLogin, setLogin, user, setUser } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    setLogin: state.setLogin,
    user: state.user,
    setUser: state.setUser,
  }));

  const { menu, setMenu } = useMenuStore((state) => ({
    menu: state.menu,
    setMenu: state.setMenu,
  }));
  const getAllItem = useAllItemStore((state) => state.getAllItem);
  //TODO add menu version

  // const { isLoading, isError, data, error, refetch } = useQuery(
  const menuQuery = useQuery(["WholeMenu"], () => {
    return axios.get("/api/category/").then((res) => {
      console.log("got menu");
      console.log(res.data);
      setMenu(res.data);
      return res.data;
    });
  });

  const userQuery = useQuery(
    ["getUserProfile"],
    () => {
      return axios.post("/api/loggedInUser/profile").then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          console.log(res.data);
          return res.data;
        }
      });
    },
    {
      enabled: isLogin,
    }
  );
  // console.log(menu);
  // const getMenu = () => {
  //   console.log("calling menu");
  //   axios.get("/api/category/").then((res) => res.data);
  // };
  // console.log(getMenu.data);

  useEffect(() => {
    console.log("getting all menu");
    getAllItem(menu);
  }, [menu, getAllItem]);

  useEffect(() => {
      const checkLogin = async () => {
        try {
          const response = await axios.get("/api/user/checkLogin");
          if (response.status === 200) {
            setLogin(true);
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            // User is not logged in, return default value
            return null;
          }
          // Other errors, throw an error
          throw err;
        }
      };
    checkLogin();
  }, [setLogin]);

  if (menuQuery.isLoading) return "Loading...";

  if (menuQuery.error) return "An error has occurred.";
  // if (menuQuery.error) return "An error has occurred: " + error.message;
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
