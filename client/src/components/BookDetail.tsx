import React, { useEffect, useState } from "react";
import classes from "./BookDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { addBook, getBookByName, removeBook } from "../features/book/bookSlice";

function BookDetail(props: {
  book: any;
  checkIfExists: (title: string) => boolean;
}) {
  const [exists, setExists] = useState(
    props.checkIfExists(props.book.volumeInfo.title)
  );
  const dispatch = useDispatch<AppDispatch>();
  function addHandler() {
    const book = {
      name: props.book.volumeInfo.title,
      author: props.book.volumeInfo.authors
        ? props.book.volumeInfo.authors[0]
        : "No author",
    };

    dispatch(addBook(book));
    setExists(true);
  }

  async function removeHandler() {
    const bookData = await dispatch(getBookByName(props.book.volumeInfo.title));
    dispatch(removeBook(bookData.payload.id));
    setExists(false);
  }

  return (
    <li className={classes.book}>
      <h2 className={classes.title}>{props.book.volumeInfo.title}</h2>
      <h3 className={classes.author}>
        {props.book.volumeInfo.authors
          ? props.book.volumeInfo.authors[0]
          : "No author"}
      </h3>
      {exists ? (
        <button className={classes.button} onClick={removeHandler}>
          {" "}
          Remove{" "}
        </button>
      ) : (
        <button className={classes.button} onClick={addHandler}>
          {" "}
          Add{" "}
        </button>
      )}
    </li>
  );
}

export default BookDetail;
