import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { TodoContextProvider } from "./context/ListContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoContextProvider>
        <Router>
          <App />
        </Router>
      </TodoContextProvider>
    </Provider>
  </React.StrictMode>
);
