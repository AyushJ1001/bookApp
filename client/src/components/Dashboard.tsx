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
  isLoading: boolean;
};

function Dashboard(props: DashboardProps) {
  const data = props.data;
  if (props.isLoading)
    return <h1>Loading...</h1>;

  return <h1>Welcome back {data.name}!</h1>;
}

export default Dashboard;
