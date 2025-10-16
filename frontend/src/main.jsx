import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "../src/redux/store.js"
import { SidebarProvider } from "./components/ui/sidebar.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <Toaster/>
      <Provider store={store}>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </Provider>
    </BrowserRouter>
);
