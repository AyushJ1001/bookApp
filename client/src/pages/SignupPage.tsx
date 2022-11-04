import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../app/store";
import SignupForm from "../components/SignupForm";
import { userData } from "../features/auth/authService";
import { register } from "../features/auth/authSlice";

function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
  const signupUser = async (data: userData) => {
    const result = await dispatch(register(data));
    console.log(result);

    navigate("/dashboard")
    
  };

  return <SignupForm signupUser={signupUser} />;
}

export default SignupPage;
