import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CategoriesProvider } from "./context/CategoriesContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import AuthContext from "./context/AuthContext";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { ArticlesProvider } from "./context/ArticlesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContext>
        <ModalProvider>
          <CategoriesProvider>
              <ArticlesProvider>
            <UserProvider>
              <App />
            </UserProvider>
              </ArticlesProvider>
          </CategoriesProvider>
          </ModalProvider>
        </AuthContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
