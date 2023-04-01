import React, { useState } from "react";
import GoBack from "../goBack/GoBack";
import Axios from "axios";
import useUserInfoStore from "../../store/authReducer";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../googleLogin/GoogleLogin";

const Register = () => {
  const navigate = useNavigate();
  const isLogin = useUserInfoStore((state) => state.isLogin);
  const [userNameInput, setUserNameInput] = useState();
  const [userPassWordInput, setUserPassWordInput] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [failedRegister, setFailedRegister] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const register = () => {
    if (userPassWordInput !== confirmPassword) {
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);
      Axios({
        method: "POST",
        data: {
          email: userNameInput,
          password: userPassWordInput,
        },
        withCredentials: true,
        url: "/api/user/register",
      })
        .then((res) => {
          if (res.status === 200) {
            // login success
            console.log("success");
            navigate("/");
          } else {
            // login failed, handle error
            console.log("register failed");
          }
        })
        .catch((error) => {
          console.log("in catch");
          setFailedRegister(true);
          console.log(error);
        });
    }
  };
  if (isLogin) {
    return <GoBack message="You already login" />;
  } else {
    return (
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
        <div className="form-outline mb-4">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="row mb-4">
          {failedRegister && <p>Register failed</p>}
          {!passwordMatch && <p>Password doesn't match</p>}
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          onClick={register}
        >
          Register
        </button>
        <GoogleLogin/>
      </form>
    );
  }
};

export default Register;
