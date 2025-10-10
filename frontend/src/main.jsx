import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "../src/redux/store.js"
import { SidebarProvider } from "./components/ui/sidebar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SidebarProvider>
          <Layout />
        </SidebarProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
