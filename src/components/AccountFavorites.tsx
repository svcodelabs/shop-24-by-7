import React from "react";
import { GoHeart } from "react-icons/go";
import { useProductContext } from "../context/ProductContext";
import { IoClose } from "react-icons/io5";

const AccountFavorites: React.FC = () => {
  const {
    favoriteState: { favorites },
    favoriteDispatch,
  } = useProductContext();

  return (
    <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-gray-200 sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12 bg-white">
      <div className="flex flex-col w-full">
        <div className="welcome-msg w-full items-center mb-3">
          <div>
            <h1 className="font-bold text-2xl text-gray-800 mb-2">
              Your Favorites List
            </h1>
            <hr />
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {favorites.map((product, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col py-4 border-b md:flex-row border-gray-300 2xl:py-5 last:pb-0 first:-mt-8 lg:first:-mt-4 2xl:first:-mt-7"
                >
                  <div className="flex ">
                    <div className="relative mt-1 shrink-0">
                      <div className="flex overflow-hidden max-w-[80px]  transition duration-200 ease-in-out transform group-hover:scale-105">
                        <img
                          alt={product.title}
                          loading="lazy"
                          width="80"
                          height="80"
                          decoding="async"
                          className="object-cover bg-fill-thumbnail"
                          src={product.thumbnail}
                          style={{ color: "transparent", width: "auto" }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ltr:ml-2 rtl:mr-2 2xl:ltr:ml-3.5 2xl:rtl:mr-3.5 h-full">
                      <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
                        {product.title}
                      </h2>
                      <div className="mb-1 text-13px sm:text-sm lg:mb-2">
                        {product.category}
                      </div>
                      <div className="-mx-1">
                        <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex cursor-pointer ltr:ml-auto rtl:mr-auto md:pt-7">
                    <IoClose />
                    <span className="text-brand ltr:ml-3 rtl:mr-3 font-semibold text-15px -mt-0.5 md:mt-0">
                      Favorited
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full min-h-div flex flex-col justify-center items-center p-12 mx-auto my-10">
          <div className="p-4">
            <GoHeart className="text-8xl text-rose-300 opacity-45" />
          </div>
          <div className="text-xl font-bold text-gray-400">
            No Favorites Found..!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountFavorites;
