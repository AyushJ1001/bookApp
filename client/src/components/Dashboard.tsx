import React from "react";

export type Data = {
  _id: string;
  name: string;
  email: string;
  password: string;
  books: Array<any>;
  updatedAt: string;
  createdAt: string;
};

type DashboardProps = {
  data: Data;
};

function Dashboard(props: DashboardProps) {
  const data = props.data;
  return <h1>Welcome back {data.name}!</h1>;
}

export default Dashboard;
