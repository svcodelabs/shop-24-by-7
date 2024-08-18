import { FaUserCircle } from "react-icons/fa";
import { useProductContext } from "../context/ProductContext";
import useAuthContext from "../hooks/useAuthContext";
import { useLoading } from "../hooks/useLoading";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { MdDashboard, MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const { auth } = useAuthContext();
  const {
    favoriteState: { favorites },
  } = useProductContext();
  const {
    loadingState: { isLoading },
  } = useLoading();

  return (
    <PageLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px8 2xl:px-10">
            <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
              <div className="flex felx-col w-full lg:flex-row">
                {/* Small Screen */}
                <div className="lg:hidden">
                  <div className="relative w-full font-body">
                    {/* content */}
                  </div>
                </div>
                {/* Left menu */}
                <div className="hidden lg:block shrink-0 w-56 xl:w-72 2xl:w-[385px] ltr:mr-7 rtl:ml-7 xl:ltr:mr-8 xl:rtl:ml-8">
                  <nav className="flex flex-col pb-2 overflow-hidden border rounded-md md:pb-6 border-border-base">
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium active:bg-gray-200"
                      to="/my-account/dashboard"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <MdDashboard
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">Dashboard</span>
                    </Link>
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium"
                      to="/my-account/account-settings"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <FaUserCircle
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">
                        Account Settings
                      </span>
                    </Link>
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 bg-fill-base font-medium"
                      to="/my-account/orders"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <IoCartOutline
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">Orders</span>
                    </Link>
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium"
                      to="/my-account/favorites"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <GoHeart
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">Favorites</span>
                    </Link>
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium"
                      to="/my-account/address"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <GrLocation
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">Address</span>
                    </Link>
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium"
                      to="/my-account/help-center"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <BiSupport
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">
                        Help Center
                      </span>
                    </Link>
                    <Link
                      className="flex items-center cursor-pointer text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium"
                      to="/my-account/change-password"
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <IoSettingsOutline
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">
                        Change Password
                      </span>
                    </Link>
                    <button className="flex items-center text-sm lg:text-[16px] text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none">
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <MdLockOutline
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-400"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">Logout</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default FavoritePage;
