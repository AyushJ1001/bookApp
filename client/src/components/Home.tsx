import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import classes from "./Home.module.css";
import BookDetail from "./BookDetail";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getAll } from "../features/book/bookSlice";

type Book = {
  id: string;
  name: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};
function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!user) return;
    dispatch(getAll()).then((res) => {
      setBooks(res.payload);
    });
  }, [JSON.stringify(books)]);

  const URL = "https://www.googleapis.com/books/v1/volumes?q=";
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const isLoading = useRef(false);
  const searchText = useRef("");

  useEffect(() => {
    isLoading.current = true;
    if (searchText.current !== "") {
      axios
        .get(URL + encodeURI(searchText.current) + `&startIndex=${currentPage}`)
        .then((response) => response.data)
        .then((data) => {
          console.log(data.items);
          setData(data.items);
        });
    }

    isLoading.current = false;
    return () => console.log("Effect");
  }, [currentPage]);

  function prevPage() {
    if (currentPage === 1) return;
    setCurrentPage((curr) => curr - 10);
  }

  function nextPage() {
    setCurrentPage((curr) => curr + 10);
  }

  function checkIfExists(title: string) {
    return books.some((book) => book.name === title);
  }

  console.log(currentPage);
  return (
    <div className={classes.home}>
      <h1 className={classes.title}>HomePage</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) =>
          (searchText.current = (e.target as HTMLButtonElement).value)
        }
        className={classes.search}
      />
      <button onClick={() => setCurrentPage(1)} className={classes.searchBtn}>
        Search
      </button>

      {isLoading.current ? (
        <h1 className={classes.loadingP1}>Loading your books...</h1>
      ) : data.length === 0 ? (
        <h1 className={classes.empty}>Empty!</h1>
      ) : (
        <ul className={classes.data}>
          {data.map((book: any) => (
            <BookDetail
              key={book.id}
              book={book}
              checkIfExists={checkIfExists}
            />
          ))}
        </ul>
      )}
      {/*  buttons for previous and next page */}
      <div className={classes.buttons}>
        {currentPage > 1 && (
          <button onClick={prevPage} className={classes.nextButton}>
            Previous
          </button>
        )}
        {currentPage > 0 && (
          <p>
            Pages: {currentPage} - {currentPage + 9}
          </p>
        )}
        {currentPage > 0 && (
          <button onClick={nextPage} className={classes.prevButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
