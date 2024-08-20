import React from "react";
import { ProductModel } from "../models/ProductModel";
import { IoClose } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import { getPriceAfterDiscount } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

interface FavProps {
  product: ProductModel;
}

const FavoriteItem: React.FC<FavProps> = ({ product }) => {
  const { favoriteDispatch, cartDispatch } = useProductContext();
  const navigate = useNavigate();

  const handleRemoveFav = () => {
    favoriteDispatch({ type: "REMOVE_FROM_FAV", payload: product });
    toast.info("Product removed from Favorite list..!");
  };

  const handleAddToCart = () => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Product added to Cart..!");
  };

  const handleClickView = (item: ProductModel) => {
    navigate(`/products/${item.id}`);
  };

  return (
    <div className="flex flex-col py-2 md:py-4 md:flex-row 2xl:py-5 border rounded-md mb-3 shadow-md">
      <div className="flex gap-x-2 md:gap-x-4 px-2 md:px-4 mb-2 md:mb-0">
        <div className="relative">
          <div
            className="flex overflow-hidden max-w-[80px] transition-all duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            onClick={() => handleClickView(product)}
          >
            <img
              alt={product.title}
              loading="lazy"
              decoding="async"
              width="80"
              height="80"
              className="object-cover bg-fill-thumbnail"
              src={product.thumbnail}
              style={{ color: "transparent", width: "auto" }}
            />
          </div>
        </div>
        <div className="flex flex-col h-full">
          <h2
            className="text-sm lg:text-base leading-5 sm:leading-6 font-bold text-gray-700 cursor-pointer hover:text-red-500"
            onClick={() => handleClickView(product)}
          >
            {product.title}
          </h2>
          <div className="mb-1 text-xs lg:text-sm lg:mb-2 text-gray-400 italic">
            {product.category}
          </div>
          <div className="-mx-1">
            {product.discountPercentage > 0 ? (
              <p className="flex gap-3">
                <span className="text-base line-through font-medium mt-auto text-gray-600">
                  ${product.price}
                </span>
                <span className="text-lg font-bold text-rose-500">
                  $
                  {getPriceAfterDiscount(
                    product.price,
                    product.discountPercentage
                  ).toFixed(2)}
                </span>
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
      </div>
      <div className="flex flex-row-reverse justify-between items-center md:flex-col md:items-end md:ml-auto px-3 mr-2">
        <div
          className="basis-auto md:basis-1/2 w-6 h-6 flex justify-center items-center cursor-pointer text-gray-400 transition-all duration-300 hover:text-rose-500 hover:scale-[1.25] active:text-rose-500 active:scale-[0.9]"
          onClick={handleRemoveFav}
        >
          <IoClose size={20} />
        </div>

        <div
          className="basis-auto md:basis-1/2 flex gap-x-2 py-1 my-1 align-bottom content-center items-center bg-purple-600 px-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-500 hover:scale-105 active:bg-purple-500 active:scale-95"
          onClick={handleAddToCart}
        >
          <FaCartShopping size={18} className="text-white" />
          <span className="font-semibold text-base clear-start text-white">
            Move to Cart
          </span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
