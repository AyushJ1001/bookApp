import React from "react";
import { Book } from "../pages/Dashboard";
import classes from "./SingleBook.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SingleBook(props: {
  book: Book;
  onClick: () => Promise<void>;
  total_pages: number;
}) {
  // total pages = random integer between 100 and 500
  const [pageNumber, setPageNumber] = React.useState(1);
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <li className={classes.book}>
      <h3>{props.book.name}</h3>
      <h4>{props.book.author}</h4>
      {/* current page number counter*/}
      <div className={classes.pageChange}>
        <button
          className={classes.prevPage}
          style={{ visibility: pageNumber === 1 ? "hidden" : "visible" }}
          onClick={() => setPageNumber((prevPage) => prevPage - 1)}
        >
          -
        </button>
        <p>
          {pageNumber}/{props.total_pages}
          <progress
            aria-label="progress bar"
            max={props.total_pages}
            value={pageNumber}
          ></progress>
        </p>
        <button
          className={classes.nextPage}
          style={{
            visibility: pageNumber === props.total_pages ? "hidden" : "visible",
          }}
          onClick={() => setPageNumber((prevPage) => prevPage + 1)}
        >
          +
        </button>
      </div>
      <section className="rating">
        <FontAwesomeIcon icon="star" />
        <FontAwesomeIcon icon="star" />
      </section>
      <button onClick={props.onClick} className={classes.Remove}>
        Remove
      </button>
    </li>
  );
}

export default SingleBook;
