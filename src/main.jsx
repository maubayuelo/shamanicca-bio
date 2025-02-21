// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/_main.scss";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
