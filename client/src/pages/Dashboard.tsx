import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../app/store";
import Dashboard from "../components/Dashboard";
import { getAll } from "../features/book/bookSlice";

export type Book = {
  _id: string;
  name: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

function DashboardPage() {
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  if (!user) navigate("/login");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAll()).then((res) => {
      setData(res.payload);
      setIsLoading(false);
    });
  }, [JSON.stringify(data)]);

  return <Dashboard data={data} isLoading={isLoading} />;
}

export default DashboardPage;
