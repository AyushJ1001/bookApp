import React from "react";
import Header from "./Header";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default Layout;
