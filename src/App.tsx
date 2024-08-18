import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ProductViewPage from "./pages/ProductViewPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./pages/RequireAuth";
import OrdersPage from "./pages/OrdersPage";
import Missing from "./pages/Missing";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NewFiltersComponent from "./components/NewFiltersComponent";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoryProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/searchResults" element={<SearchResultsPage />} />
        <Route path="/products/:id" element={<ProductViewPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/test" element={<NewFiltersComponent />} />
        <Route element={<RequireAuth />}>
          {/* <Route path="/my-account/orders" element={<OrdersPage />} />
          <Route path="/my-account/favorites" element={<FavoritePage />} /> */}
          <Route path="/my-account/:page" element={<AccountPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
