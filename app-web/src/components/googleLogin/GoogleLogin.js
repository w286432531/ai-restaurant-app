import React from 'react'
import googleSignIn from "../../images/btn_google_signin_light_normal_web.png";
const GoogleLogin = () => {
      const googleLogin = () => {
        window.open("http://localhost:5000/api/user/googleLogin", "_self");
      };
  return (
    <div>
      <p>or sign in with:</p>
      <button type="button" className="btn btn-link">
        <img src={googleSignIn} alt="" onClick={googleLogin} />
      </button>
    </div>
  );
}

export default GoogleLogin