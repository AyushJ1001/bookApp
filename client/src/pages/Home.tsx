import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AllUsers from "../components/AllUsers";
import BookDetail from "../components/BookDetail";
import Home from "../components/Home";

type User = {
  name: String;
  email: String;
};

function HomePage() {
  return <Home />;
}

export default HomePage;
