import React from "react";
import { Book } from "../pages/Dashboard";
import classes from "./Dashboard.module.css";
import { useDispatch } from "react-redux";
import { removeBook } from "../features/book/bookSlice";
import { AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import SingleBook from "./SingleBook";

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
  data: Book[];
  isLoading: boolean;
};

function Dashboard(props: DashboardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const data = props.data;
  console.log(data);
  if (props.isLoading) return <h1>Loading...</h1>;
  async function removeHandler(id: string) {
    const result = await dispatch(removeBook(id));
    window.location.reload();
  }

  return (
    <div className={classes.dashboard}>
      <h1>Dashboard</h1>
      <h2>Your Books</h2>
      {data.length === 0 ? (
        <p className={classes.noBooks}>No Books Yet!</p>
      ) : (
        <>
          <ul className={classes.books}>
            {data.map((book: Book) => (
              <SingleBook
                key={book._id}
                book={book}
                onClick={() => removeHandler(book._id)}
                total_pages={Math.floor(Math.random() * 400) + 100}
              />
            ))}
          </ul>
          <Link to="/" className={classes.newBookLink}>
            Add New Book
          </Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;
