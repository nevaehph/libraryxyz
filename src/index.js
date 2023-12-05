import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./index.css";

//Screens
import Screens from "./screens";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ThemeProvider breakpoints={["sm", "md", "lg"]} minBreakpoint={"sm"}>
        <Screens />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
