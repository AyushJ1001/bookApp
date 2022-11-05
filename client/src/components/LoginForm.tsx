import React, { FormEvent, Fragment, useState } from "react";
import { userLoginData } from "../features/auth/authService";
import classes from "./LoginForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type LoginFormProps = {
  loginUser: (data: userLoginData) => void;
};

function LoginForm({ loginUser }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    loginUser(data);
  };

  return (
    <div className={classes.Main}>
      <h1 className={classes.title}>Log In</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
          />
          <input
            className={classes.input}
            type={isChecked ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.passwordGroup}>
            <input
              type="checkbox"
              className={classes.checkbox}
              onChange={() => setIsChecked((prev) => !prev)}
            />
            {isChecked ? (
              <FontAwesomeIcon icon={faEye} className={classes.icon} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className={classes.icon} />
            )}
          </div>
          <button type="submit" className={classes.submit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
