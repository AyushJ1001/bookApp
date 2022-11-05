import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../app/store";
import Dashboard, { Data } from "../components/Dashboard";

function DashboardPage() {
  const [data, setData] = useState<Data>({
    _id: "",
    name: "",
    email: "",
    password: "",
    books: [],
    updatedAt: "",
    createdAt: "",
  });
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  if (!user) navigate("/login");

  const userData = fetch("/users/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user!}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setData(data));

  return <Dashboard data={data} />;
}

export default DashboardPage;
