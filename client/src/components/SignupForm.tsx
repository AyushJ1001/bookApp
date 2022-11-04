import React, { FormEvent, useState } from "react";
import { userData } from "../features/auth/authService";

type SignupFormProps = {
  signupUser: (data: userData) => void;
};

function SignupForm({ signupUser }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <form onSubmit={submitHandler}>
      <div className="input-control">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
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

export default SignupForm;
