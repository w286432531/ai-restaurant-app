import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserInfoStore } from "../../../store/userReducer";
import GoBack from "../../goBack/GoBack";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../googleLogin/GoogleLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Login = () => {
  const { isLogin, setLogin } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    setLogin: state.setLogin,
  }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [userNameInput, setUserNameInput] = useState();
  const [userPassWordInput, setUserPassWordInput] = useState();
  const [failedLogin, setFailedLogin] = useState(false);
  const login = () => {
    Axios({
      method: "POST",
      data: {
        email: userNameInput,
        password: userPassWordInput,
      },
      withCredentials: true,
      url: "/api/user/login",
    })
      .then((res) => {
        if (res.status === 200) {
          // login success
          console.log("success");
          setLogin(true);
          // get the previous page URL
          const previousPage = document.referrer;
          // check if the previous page is on your site
          if (previousPage.includes(window.location.origin)) {
            // redirect user to the previous page
            navigate(-1);
          } else {
            // redirect user to the home page
            navigate("/");
          }
        } else {
          // login failed, handle error
          console.log("Login failed.");
        }
      })
      .catch((error) => {
        console.log("in catch");
        setFailedLogin(true);
        console.log(error);
      });
  };
    // const loginMutation = useMutation({
    //   mutationFn: login,
    //   onSuccess: () => {
    //     // Invalidate and refetch
    //     queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    //   },
    // });
  if (isLogin) {
    return <GoBack message="You already login" />;
  } else {
    return (
      <>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label ">Email address</label>
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setUserNameInput(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setUserPassWordInput(e.target.value)}
            />
          </div>

          <div className="row mb-4">
            {/* <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                onChange={()=> 0}
                checked
              />
              <label className="form-check-label"> Remember me </label>
            </div>
          </div> */}

            {/* <div className="col">
            <a href="#!">Forgot password?</a>
          </div> */}
            {failedLogin && <p>Wrong username or password, please try again</p>}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={login}
          >
            Sign in
          </button>
          <div className="text-center">
            <p>
              Not a member?<Link to={"/register"}>Register</Link>
            </p>
          </div>
          <GoogleLogin />
        </form>
      </>
    );
  }
};
export default Login;
