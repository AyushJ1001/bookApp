import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../app/store";

function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  if (!user) navigate("/login");

    

  return <div>DashboardPage</div>;
}

export default DashboardPage;
