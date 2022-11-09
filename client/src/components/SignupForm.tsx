import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import { userData } from "../features/auth/authService";
import classes from "./SignUpForm.module.css";

type SignupFormProps = {
  signupUser: (data: userData) => void;
};

function SignupForm({ signupUser }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };

    signupUser(data);
  };

  return (
    <div className={classes.Main}>
      <h1 className={classes.title}>Sign Up</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className={classes.input}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
          />
          <input
            type={isChecked ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
