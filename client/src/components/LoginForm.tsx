import React, { FormEvent, useState } from "react";
import { userData } from "../features/auth/authService";

type LoginFormProps = {
  loginUser: (data: userData) => void;
};

function LoginForm({ loginUser }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: "",
      email,
      password,
    };

    loginUser(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="input-control">
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
