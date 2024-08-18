import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./context/ProductContext.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import LoadingProvider from "./context/LoadingProvider.tsx";
import SearchProvider from "./context/SearchProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <CategoryProvider>
          <SearchProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SearchProvider>
        </CategoryProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>
);
