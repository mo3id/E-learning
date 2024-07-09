// type Props = {};
import React, { useState } from "react";
import classes from "./login.module.css";

import LoginForm from "../../Components/LoginForms/LoginForm";
import ForgetPasswordForm from "../../Components/LoginForms/ForgetPasswordForm";


const Login: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
 
  return (
    <div className={`${classes.loginPage} ${classes.loginPageStyle}`}>
      {isLoginForm && <LoginForm switchForm={setIsLoginForm}></LoginForm>}
      {!isLoginForm && (
        <ForgetPasswordForm switchForm={setIsLoginForm}></ForgetPasswordForm>
      )}
    </div>
  );
};

export default Login;
