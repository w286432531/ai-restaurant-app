import { useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./router/Layout";
import { useQuery } from "@tanstack/react-query";
import { useMenuStore, useAllItemStore } from "./store/menuReducer";
import { useUserInfoStore, useCartStore } from "./store/userReducer";
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
  const { cart, setCart } = useCartStore((state) => ({
    cart: state.cart,
    setCart: state.setCart,
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
      enabled: isLogin === true,
    }
  );
  // console.log(menu);
  // const getMenu = () => {
  //   console.log("calling menu");
  //   axios.get("/api/category/").then((res) => res.data);
  // };
  // console.log(getMenu.data);
  useEffect(() => {
    getAllItem(menu);
  }, [menu, getAllItem]);

  //look up use call back
  const checkLogin = useCallback(async () => {
    try {
      const response = await axios.get("/api/user/checkLogin");
      if (response.status === 200) {
        setLogin(true);
      }
    } catch (err) {
      setLogin(false);
      setUser({roleId:0});
      return;
    }
  }, [setLogin]);

  useEffect(() => {
    void checkLogin();
  }, [setLogin, checkLogin]);

  useEffect(() => {
    // set initial cart
      let resultCart = { cartItems: {}, updatedAt: 0 };
      let hasSessionCart = localStorage.getItem("cart") !== null;
      if (isLogin === true) {
        let hasDatabaseCart = user.cart !== null;
      if (hasSessionCart && !hasDatabaseCart) {
        resultCart = JSON.parse(localStorage.getItem("cart"));
      } else if (!hasSessionCart && hasDatabaseCart) {
        resultCart = user.cart;
      } else if (hasSessionCart && hasDatabaseCart) {
        let databaseCartUpdateTime = user.cart.updatedAt;
        let sessionCart = JSON.parse(localStorage.getItem("cart"));
        let sessionCartUpdateTime = sessionCart.updatedAt;
        resultCart = sessionCartUpdateTime > databaseCartUpdateTime ? sessionCart: user.cart;
      }
    } else if (hasSessionCart) {
      resultCart = JSON.parse(localStorage.getItem("cart"));
    }
      localStorage.setItem("cart", JSON.stringify(resultCart));
      setCart(resultCart);
  }, [setUser, user]);

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
