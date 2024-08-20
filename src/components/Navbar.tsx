import { Link, NavLink, useLocation } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { FaOpencart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { MdSearch } from "react-icons/md";
import CartSidebarComponent from "./CartSidebarComponent";
import useBreakpoint from "../hooks/useBreakpoint";

const Navbar = () => {
  const { auth } = useAuthContext();
  const {
    categoryState: { categories, loading, error },
    cartState: { cart },
  } = useProductContext();
  const [viewCategory, setViewCategory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const [smOpen, setSmOpen] = useState<boolean>(false);
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const logout = useLogout();
  const [isUserView, setIsUserView] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchShow, setIsSearchShow] = useState<boolean>(false);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (auth && auth.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  useEffect(() => {
    if (location.pathname.includes("categories")) {
      setIsCategory((prev) => !prev);
    } else {
      setIsCategory(false);
    }
  }, [location]);

  const toggleMenu = () => {
    setViewCategory((prev) => !prev);
  };

  const signOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logout();
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setViewCategory(false);
      }
      if (
        userIconRef.current &&
        !userIconRef.current.contains(event.target as Node)
      ) {
        setIsUserView(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="bg-gray-800 p-4 shadow-md w-full top-0 left-0 relative content-center h-[9vh]">
        <div className="container relative mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/">
            <div className="flex flex-shrink-0 items-center gap-2 md:gap-4 cursor-pointer">
              <FaOpencart className="text-white text-4xl lg:text-5xl" />
              <span className="text-white hidden text-lg lg:flex md:text-xl lg:text-2xl">
                Shop 24/7
              </span>
            </div>
          </a>
          {/* Search Bar */}
          <SearchBar className="hidden lg:flex" />
          {/* Nav Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to="/"
              className={
                "text-white nav-link-item [&.active]:text-gray-700 [&.active]:rounded-md [&.active]:bg-purple-300 [&.active]:px-2 [&.active]:py-1 [&.active]:font-bold"
              }
            >
              Home
            </NavLink>
            <div className="relative" ref={dropdownRef}>
              <button
                className={`text-white nav-link-item ${
                  isCategory ? "nav-active" : ""
                }`}
                onClick={toggleMenu}
              >
                Categories
              </button>
              {viewCategory && (
                <div className="absolute left-0 mt-5 w-48 bg-white text-black rounded-sm shadow-lg z-[35]">
                  {error ? (
                    <div>Loading Failed..!</div>
                  ) : loading ? (
                    <div>Loading</div>
                  ) : (
                    categories?.slice(0, 6).map((category) => (
                      <div key={category.slug}>
                        <NavLink
                          to={`/categories/${category.slug}`}
                          state={{ data: category }}
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setViewCategory(false)}
                        >
                          {category.name}
                        </NavLink>
                      </div>
                    ))
                  )}
                  <Link
                    to={`/categories`}
                    className="block px-4 py-2 text-purple-600 underline underline-offset-4 text-center font-bold hover:bg-gray-200 hover:text-black"
                    onClick={() => setViewCategory(false)}
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            <NavLink
              to="/products"
              className="text-white nav-link-item [&.active]:text-gray-700 [&.active]:rounded-md [&.active]:bg-purple-300 [&.active]:px-2 [&.active]:py-1 [&.active]:font-bold"
            >
              Products
            </NavLink>
            <div
              className="relative cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FaCartShopping size={24} className="text-white" />
              {cart.length > 0 && (
                <>
                  <span className="animate-ping absolute top-[-16px] right-[-16px] h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                  <div className="absolute rounded-full top-[-12px] right-[-14px] w-5 h-5 bg-yellow-200 flex justify-center content-center">
                    <p className="text-gray-900 text-[10px] font-bold leading-3 my-auto">
                      {cart.length}
                    </p>
                  </div>
                </>
              )}
            </div>
            {isLoggedIn ? (
              <div ref={userIconRef}>
                <img
                  src={auth?.image}
                  className="w-9 h-9 border-2 border-white rounded-full cursor-pointer relative"
                  onClick={() => setIsUserView(!isUserView)}
                />
                {isUserView && (
                  <div className="absolute right-0 top-14 h-auto w-32 z-20 bg-gray-800 flex flex-col content-center gap-3 p-3 rounded-md shadow-md transition-all duration-400">
                    <NavLink
                      to="/my-account/dashboard"
                      className="text-white nav-link-item nav-drop-item [&.active]:text-gray-700 [&.active]:rounded-md [&.active]:bg-purple-300 [&.active]:px-2 [&.active]:py-1 [&.active]:font-bold"
                      onClick={() => setIsUserView(false)}
                    >
                      Account
                    </NavLink>
                    <button
                      onClick={(e) => {
                        signOut(e);
                        setIsUserView(false);
                      }}
                      className="text-white nav-link-item nav-drop-item [&.active]:text-gray-700 [&.active]:rounded-md [&.active]:bg-purple-300 [&.active]:px-2 [&.active]:py-1 [&.active]:font-bold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-white nav-link-item [&.active]:text-gray-700 [&.active]:rounded-md [&.active]:bg-purple-300 [&.active]:px-2 [&.active]:py-1 [&.active]:font-bold"
              >
                Login
              </NavLink>
            )}
          </div>
          {/* Search Bar */}
          {isSearchShow && (breakpoint === "sm" || breakpoint === "md") && (
            <SearchBar closeSearch={() => setIsSearchShow(false)} />
          )}
          <div
            className={`flex lg:hidden justify-end items-center w-full mr-2 ${
              isSearchShow ? "hidden" : "flex"
            }`}
          >
            <MdSearch
              className="text-white cursor-pointer text-3xl"
              onClick={() => setIsSearchShow(true)}
            />
          </div>
          <div
            className="flex lg:hidden items-center pr-3 relative cursor-pointer"
            // onClick={(e) => handleCartClick(e)}
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaCartShopping className="text-white text-2xl" />
            {cart.length > 0 && (
              <>
                <div className="absolute rounded-full top-[-8px] right-[0px] w-4 h-4 bg-yellow-200 flex justify-center content-center">
                  <p className="text-gray-900 text-[9px] font-bold leading-3 my-auto">
                    {cart.length}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex lg:hidden items-center space-x-4">
            <CgMenuGridO
              className="text-white cursor-pointer text-3xl"
              onClick={() => setSmOpen(!smOpen)}
            />
          </div>
        </div>
        <div
          className={`flex flex-col gap-y-3 py-1 lg:hidden items-center absolute bg-gray-800 shadow-lg w-60 z-20 transition-all duration-500 ${
            smOpen ? "top-16 right-0" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="text-white nav-link-item-sm"
            onClick={() => setSmOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-white nav-link-item-sm"
            onClick={() => setSmOpen(false)}
          >
            Categories
          </Link>
          <Link
            to="/products"
            className="text-white nav-link-item-sm"
            onClick={() => setSmOpen(false)}
          >
            Products
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/my-account/dashboard"
                className="text-white nav-link-item-sm"
                onClick={() => setSmOpen(false)}
              >
                Account
              </Link>
              <button
                onClick={(e) => {
                  signOut(e);
                  setSmOpen(false);
                }}
                className="text-white nav-link-item-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white nav-link-item-sm"
              onClick={() => setSmOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
        <CartSidebarComponent
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
