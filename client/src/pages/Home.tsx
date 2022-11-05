import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AllUsers from "../components/AllUsers";

type User = {
  name: String;
  email: String;
};

function HomePage() {
  const URL = "https://www.googleapis.com/books/v1/volumes?q=";
  const [data, setData] = useState<any>([]);
  const isLoading = useRef(false);
  const searchText = useRef("");
  const clickHandler = () => {
    isLoading.current = true;
    axios
      .get(URL + encodeURI(searchText.current))
      .then((response) => response.data)
      .then((data) => {
        console.log(data.items);
        setData(data.items);
      });

    isLoading.current = false;
    return () => console.log("Effect");
  }

  return (
    <>
      <h1>HomePage</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => (searchText.current = e.target.value)}
      />
      <button onClick={clickHandler}>Search</button>
      {isLoading.current ? (
        <h1>Loading your books...</h1>
      ) : data.length === 0 ? (
        <h1>Empty!</h1>
      ) : (
        data.map((book: any) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <h3 style={{ opacity: 0.5, fontStyle: "italic" }}>
              {book.volumeInfo.authors
                ? book.volumeInfo.authors[0]
                : "No author"}
            </h3>
          </div>
        ))
      )}
    </>
  );
}

export default HomePage;
