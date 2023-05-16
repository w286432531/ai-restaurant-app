import { useState, useEffect } from "react";
import { useUserInfoStore, useCartStore } from "../store/userReducer";

const useUserLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    loading: true,
    userRole: undefined,
  });

  const { isLogin, user } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));

  useEffect(() => {
    if (isLogin !== null && user !== null) {
      setIsLoggedIn({
        loading: false,
        userRole: user.roleId,
      });
      //Error if logged in and no user role.
    }
  }, [isLogin, user]);

  return isLoggedIn;
};

export default useUserLoggedIn;
