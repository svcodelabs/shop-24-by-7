import { FaAngleDown, FaUserCircle } from "react-icons/fa";
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
import React, { useState } from "react";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import AccountDashboard from "../components/AccountDashboard";
import AccountSettings from "../components/AccountSettings";
import AccountOrders from "../components/AccountOrders";
import AccountFavorites from "../components/AccountFavorites";
import AccountAddress from "../components/AccountAddress";
import AccountHelp from "../components/AccountHelp";
import AccountPassword from "../components/AccountPassword";
import DiscountBanner from "../components/DiscountBanner";
import DiscountCoupon from "../components/DiscountCoupon";
import useLogout from "../hooks/useLogout";

interface LinkModel {
  label: string;
  icon: JSX.Element;
  href: string;
}

const links: LinkModel[] = [
  {
    href: "/my-account/dashboard",
    label: "Dashboard",
    icon: (
      <MdDashboard
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
  {
    href: "/my-account/account-settings",
    label: "Account Settings",
    icon: (
      <FaUserCircle
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
  {
    href: "/my-account/orders",
    label: "Orders",
    icon: (
      <IoCartOutline
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
  {
    href: "/my-account/favorites",
    label: "Favorites",
    icon: (
      <GoHeart
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
  {
    href: "/my-account/address",
    label: "Address",
    icon: (
      <GrLocation
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
  {
    href: "/my-account/help-center",
    label: "Help Center",
    icon: (
      <BiSupport
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
  {
    href: "/my-account/change-password",
    label: "Change Password",
    icon: (
      <IoSettingsOutline
        size={22}
        className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
      />
    ),
  },
];

const AccountPage: React.FC = () => {
  const {
    auth,
    userState: { user },
  } = useAuthContext();
  const {
    loadingState: { isLoading },
  } = useLoading();
  const [curLink, setCurLink] = useState<LinkModel>(links[0]);
  const logout = useLogout();

  const signOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logout();
  };

  return (
    <PageLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px8 2xl:px-10">
            <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
              <BreadcrumbComponent />
              <div className="flex flex-col w-full lg:flex-row">
                {/* Small Screen */}
                <div className="lg:hidden mt-4">
                  <Menu as="div" className="relative  w-full font-body">
                    <div>
                      <MenuButton className="relative flex items-center w-full p-1 pr-4 border rounded cursor-pointer text-gray-800 md:p-5 focus:outline-none border-gray-300 gap-x-1.5 bg-white font-semibold justify-between shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-gray-50">
                        <MenuItem>
                          <Link
                            className="flex items-center cursor-pointer text-base lg:text-lg text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium hover:bg-gray-200"
                            to={curLink.href}
                          >
                            <span className="flex justify-center w-9 xl:w-10 shrink-0">
                              {curLink.icon}
                            </span>
                            <span className="ltr:pl-1 lg:rtl:pr-1.5">
                              {curLink.label}
                            </span>
                          </Link>
                        </MenuItem>
                        <FaAngleDown
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-gray-400"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute z-20 w-full py-2.5 mt-1.5 overflow-auto bg-white rounded-md shadow-md max-h-72 focus:outline-none text-sm md:text-lg    ring-1 ring-black ring-opacity-5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        {links.map((link, i) => {
                          return (
                            <MenuItem key={i}>
                              <Link
                                className="flex items-center cursor-pointer text-base lg:text-lg text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium hover:bg-gray-200"
                                to={link.href}
                                onClick={() => setCurLink(link)}
                              >
                                <span className="flex justify-center w-9 xl:w-10 shrink-0">
                                  {link.icon}
                                </span>
                                <span className="ltr:pl-1 lg:rtl:pr-1.5">
                                  {link.label}
                                </span>
                              </Link>
                            </MenuItem>
                          );
                        })}
                        <MenuItem>
                          <button
                            className="flex items-center text-base lg:text-lg text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer hover:bg-gray-200 focus:outline-none"
                            onClick={signOut}
                          >
                            <span className="flex justify-center w-9 xl:w-10 shrink-0">
                              <MdLockOutline
                                size={22}
                                className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
                              />
                            </span>
                            <span className="ltr:pl-1 lg:rtl:pr-1.5">
                              Logout
                            </span>
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
                {/* Left menu */}
                <div className="hidden lg:block shrink-0 w-56 xl:w-72 2xl:w-[385px] mr-7 xl:mr-8 rounded-md">
                  <nav className="flex flex-col pb-2 overflow-hidden border bg-white shadow-sm rounded-md md:pb-6 border-border-base">
                    {links.map((link, i) => {
                      return (
                        <Link
                          key={i}
                          className={`flex items-center cursor-pointer text-base lg:text-lg text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 font-medium hover:bg-gray-200 ${
                            link.label === curLink.label
                              ? "bg-gray-100 border-r-4 border-r-gray-500"
                              : ""
                          }`}
                          to={link.href}
                          onClick={() => setCurLink(link)}
                        >
                          <span
                            className={`flex justify-center w-9 xl:w-10 shrink-0 ${
                              link.label === curLink.label
                                ? "text-rose-500"
                                : ""
                            }`}
                          >
                            {link.icon}
                          </span>
                          <span
                            className={`ltr:pl-1 lg:rtl:pr-1.5 ${
                              link.label === curLink.label
                                ? "text-rose-500"
                                : ""
                            }`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                    <button
                      className="flex items-center text-base lg:text-lg text-gray-800 py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer hover:bg-gray-200 focus:outline-none"
                      onClick={signOut}
                    >
                      <span className="flex justify-center w-9 xl:w-10 shrink-0">
                        <MdLockOutline
                          size={22}
                          className="w-5 md:w-[22px] h-5 md:h-[22px] text-gray-500"
                        />
                      </span>
                      <span className="ltr:pl-1 lg:rtl:pr-1.5">Logout</span>
                    </button>
                  </nav>
                </div>
                {/* Right Container */}
                <div className="flex flex-col w-full">
                  <div className="w-full p-4 mt-4 mb-5 overflow-x-auto border rounded-md lg:mt-0 border-gray-200 sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12 bg-white">
                    <div className="flex flex-col w-full">
                      <div className="welcome-msg w-full flex flex-row gap-4 items-center">
                        <img
                          src={auth?.image}
                          className="w-16 h-w-16 border-2 border-rose-500 rounded-full cursor-pointer relative"
                        />
                        <div>
                          <p className="text-gray-800 text-base md:text-lg">
                            Hello, {user.firstName} {user.lastName}
                          </p>
                          <h1 className="font-semibold text-xl md:font-bold md:text-2xl text-gray-800">
                            Welcome to your Profile
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  {curLink.label === "Dashboard" && <AccountDashboard />}
                  {curLink.label === "Account Settings" && <AccountSettings />}
                  {curLink.label === "Orders" && <AccountOrders />}
                  {curLink.label === "Favorites" && <AccountFavorites />}
                  {curLink.label === "Address" && <AccountAddress />}
                  {curLink.label === "Help Center" && <AccountHelp />}
                  {curLink.label === "Change Password" && <AccountPassword />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <DiscountBanner>
        <DiscountCoupon discount={21} />
      </DiscountBanner>
    </PageLayout>
  );
};

export default AccountPage;
