import ReactDOM from "react-dom/client";
import React from "react";
import Modal from 'react-modal';
import App from "./App.jsx";
import "./index.css";

// Set the root element for react-modal for accessibility reasons
Modal.setAppElement('#root');

// Get the "root" div from index.html.
// The React application will be inserted into this div.
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
