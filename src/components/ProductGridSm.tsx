import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { ProductModel } from "../models/ProductModel";
import { IoIosExpand } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { getPriceAfterDiscount } from "../utils/helpers";
import RatingComponent from "./RatingComponent";
import React, { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import { IoCart } from "react-icons/io5";

interface ProdProps {
  product: ProductModel;
}

const ProductGridSm: React.FC<ProdProps> = ({ product }) => {
  const { auth } = useAuthContext();
  const {
    cartDispatch,
    cartState: { cart },
    favoriteDispatch,
    favoriteState: { favorites },
  } = useProductContext();
  const navigate = useNavigate();

  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleClickView = (item: ProductModel) => {
    navigate(`/products/${item.id}`);
  };

  const handleAddCart = (item: ProductModel) => {
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };

  const handleAddFav = (item: ProductModel) => {
    if (auth?.token) {
      //Handle add to fav list
      if (isFavorite) {
        favoriteDispatch({ type: "REMOVE_FROM_FAV", payload: item });
        toast.info("Product removed from favorite list..!");
      } else {
        favoriteDispatch({ type: "ADD_TO_FAV", payload: item });
        toast.success("Product added to favorite list..!");
      }

      // navigate("/my-account/favorites", { replace: true });
    } else {
      toast.warning("Please Login to add to favorites");
      navigate("/login", { replace: true });
    }
  };

  const productCart = cart.find((p) => p.id === product.id);

  return (
    <div data-aos="fade-up" className="aos-init aos-animate">
      <div className="group relative border border-gray-100 rounded-md shadow-md overflow-hidden">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-white lg:aspect-none  lg:h-80">
          <img
            alt={product.title}
            src={product.thumbnail}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 px-4 pb-3 flex justify-between">
          <div className="flex flex-col gap-y-2">
            <RatingComponent rating={Math.round(product.rating)} />
            <h3
              className="text-base font-bold text-gray-700 cursor-pointer hover:text-red-500"
              onClick={() => handleClickView(product)}
            >
              {product.title}
            </h3>
            {product.discountPercentage > 0 ? (
              <p className="flex gap-3">
                <span className="text-lg line-through font-bold text-gray-600">
                  ${product.price}
                </span>
                <span className="text-lg font-bold text-rose-500">
                  $
                  {getPriceAfterDiscount(
                    product.price,
                    product.discountPercentage
                  ).toFixed(2)}
                </span>
                {cart.some((p) => p.id === product.id) && (
                  <span className="flex justify-end items-center w-full">
                    <IoCart className="text-lg text-purple-500" />
                  </span>
                )}
              </p>
            ) : (
              <p className="flex gap-3">
                <span className="text-lg font-bold text-gray-600">
                  ${product.price}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center content-center space-y-4 absolute group-hover:right-4 -right-14 top-20  transition-all duration-300 ease-in-out">
          <span
            className="w-10 h-10 mx-auto flex justify-center items-center rounded-full shadow-md bg-purple-500 cursor-pointer active:scale-[.96] active:bg-purple-600 active:duration-300 transition-all hover:scale-[1.09] hover:bg-purple-600  ease-in-out transform"
            onClick={() => handleClickView(product)}
          >
            <IoIosExpand size={20} className="text-white" />
          </span>
          <span
            className="w-10 h-10 mx-auto flex justify-center items-center rounded-full shadow-md bg-purple-500 cursor-pointer active:scale-[.96] active:bg-purple-600 active:duration-300 transition-all hover:scale-[1.09] hover:bg-purple-600  ease-in-out transform"
            onClick={() => handleAddFav(product)}
          >
            {isFavorite ? (
              <GoHeartFill size={20} className="text-white" />
            ) : (
              <GoHeart size={20} className="text-white" />
            )}
          </span>
          {cart.some((p) => p.id === product.id) ? (
            <>
              <span
                className="w-8 h-8 mx-auto flex justify-center items-center rounded-full shadow-md bg-rose-500 cursor-pointer active:scale-[.96] active:bg-rose-600 active:duration-300 transition-all hover:scale-[1.09] hover:bg-rose-600  ease-in-out transform"
                onClick={() =>
                  cartDispatch({
                    type: "CHANGE_CART_QTY",
                    payload: {
                      ...productCart,
                      quantity: (productCart?.quantity ?? 0) - 1,
                    },
                  })
                }
              >
                <FaMinus size={16} className="text-white" />
              </span>
              <span className="w-8 h-8 mx-auto flex justify-center items-center rounded-md shadow-md bg-gray-700 text-white font-bold">
                {productCart ? productCart.quantity : "0"}
              </span>
              <span
                className="w-8 h-8 mx-auto flex justify-center items-center rounded-full shadow-md bg-rose-500 cursor-pointer active:scale-[.96] active:bg-rose-600 active:duration-300 transition-all hover:scale-[1.09] hover:bg-rose-600  ease-in-out transform"
                onClick={() =>
                  cartDispatch({
                    type: "CHANGE_CART_QTY",
                    payload: {
                      ...productCart,
                      quantity: (productCart?.quantity ?? 0) + 1,
                    },
                  })
                }
              >
                <FaPlus size={16} className="text-white" />
              </span>
            </>
          ) : (
            <span
              className="w-12 h-12 flex justify-center items-center rounded-full shadow-md bg-yellow-300 cursor-pointer active:scale-[.96] active:bg-yellow-400 active:duration-300 transition-all hover:scale-[1.09] hover:bg-yellow-400  ease-in-out transform"
              onClick={() => handleAddCart(product)}
            >
              <FaCartPlus size={20} className="text-gray-700" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGridSm;
