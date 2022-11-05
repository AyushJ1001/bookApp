import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../app/store";
import LoginForm from "../components/LoginForm";
import { userLoginData} from "../features/auth/authService";
import { login } from "../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginUser = async (data: userLoginData) => {
    const result = await dispatch(login(data));
    console.log(result);

    navigate("/dashboard");
  };

  return <LoginForm loginUser={loginUser} />;
}

export default LoginPage;
