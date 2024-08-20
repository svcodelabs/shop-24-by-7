import React from "react";
import { CartProductModel } from "../models/CartModel";
import { useProductContext } from "../context/ProductContext";
import { FaXmark } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartProps {
  cartItem: CartProductModel;
  onClickView: () => void;
}

const CartItemFull: React.FC<CartProps> = ({ cartItem, onClickView }) => {
  const { cartDispatch } = useProductContext();

  return (
    <div className="group w-full h-auto flex relative justify-start items-center rounded-md bg-white shadow-md p-3 mb-3">
      <div
        className="flex rounded overflow-hidden shrink-0 cursor-pointer w-24 md:w-28 h-24 md:h-w-28"
        onClick={onClickView}
      >
        <img
          alt={cartItem.title}
          loading="lazy"
          width="100"
          height="100"
          decoding="async"
          className="object-cover bg-fill-thumbnail"
          src={cartItem.thumbnail}
          style={{ color: "transparent", width: "auto" }}
        />
      </div>
      <div className="flex flex-col justify-between w-full overflow-hidden">
        <div className="leading-5 transition-all text-gray-800 pt-4  py-2">
          <span
            className="text-base md:text-lg font-medium hover:text-purple-500 cursor-pointer transition-all duration-200 ease-in-out"
            onClick={onClickView}
          >
            {cartItem.title}
          </span>
        </div>
        <div
          className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-500 p-1 cursor-pointer duration-300 transition-all ease-in-out transform hover:bg-gray-200 hover:rounded-full hover:text-rose-500"
          onClick={() =>
            cartDispatch({ type: "REMOVE_FROM_CART", payload: cartItem })
          }
        >
          <FaXmark size={18} />
        </div>
        <div className="flex flex-col items-center gap-y-3 md:flex-row md:justify-between  py-2">
          <div className="flex gap-2">
            <div className="text-base text-gray-500">
              ${cartItem.price} x {cartItem.quantity}
            </div>
            <div className="text-base font-semibold text-rose-500">
              ${cartItem.total.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-x-3 px-2">
            <span
              className={`w-8 h-8 mx-auto flex justify-center items-center rounded-full shadow-sm bg-purple-500 cursor-pointer active:bg-purple-600 active:shadow-md duration-300 transition-all hover:shadow-md hover:bg-purple-600  ease-in-out ${
                cartItem.quantity <= 1
                  ? "pointer-events-none cursor-none opacity-50"
                  : ""
              }`}
              onClick={() =>
                cartDispatch({
                  type: "CHANGE_CART_QTY",
                  payload: {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                  },
                })
              }
            >
              <FaMinus size={16} className="text-white" />
            </span>
            <span className="w-8 h-8 mx-auto flex justify-center items-center rounded-md shadow-sm bg-gray-200 text-gray-900 font-bold">
              {cartItem ? cartItem.quantity : "0"}
            </span>
            <span
              className="w-8 h-8 mx-auto flex justify-center items-center rounded-full shadow-sm bg-purple-500 cursor-pointer active:bg-purple-600 active:shadow-md duration-300 transition-all hover:shadow-md hover:bg-purple-600  ease-in-out"
              onClick={() =>
                cartDispatch({
                  type: "CHANGE_CART_QTY",
                  payload: {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  },
                })
              }
            >
              <FaPlus size={16} className="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemFull;
