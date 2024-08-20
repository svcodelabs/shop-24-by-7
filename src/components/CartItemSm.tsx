import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { CartProductModel } from "../models/CartModel";
import { useProductContext } from "../context/ProductContext";

interface CartProps {
  cartItem: CartProductModel;
  onClickView: () => void;
}

const CartItemSm: React.FC<CartProps> = ({ cartItem, onClickView }) => {
  const { cartDispatch } = useProductContext();

  return (
    <div className="group flex flex-col w-full h-auto py-4 md:py-7 border-b border-opacity-70 relative last:border-b-0">
      <div className="flex justify-start items-center">
        <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-16 md:w-24 h-16 md:h-24">
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
          <div
            className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
            role="button"
          >
            <FaXmark
              className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
              onClick={() =>
                cartDispatch({ type: "REMOVE_FROM_CART", payload: cartItem })
              }
            />
          </div>
        </div>
        <div className="flex items-start justify-between w-full overflow-hidden">
          <div className="pl-3 md:pl-4">
            <div
              className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-rose-500"
              onClick={onClickView}
            >
              {cartItem.title}
            </div>
            <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
              1 item (${cartItem.price}) X {cartItem.quantity}
            </div>
            <div className="hidden md:inline-flex items-center justify-between rounded overflow-hidden shrink-0 p-1">
              <button
                className="flex items-center justify-center shrink-0  transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none !w-6 !h-6 pr-0 border border-border-three hover:bg-brand text-brand-muted hover:border-brand rounded-full hover:text-brand-light"
                onClick={() =>
                  cartDispatch({
                    type: "CHANGE_CART_QTY",
                    payload: { ...cartItem, quantity: cartItem.quantity - 1 },
                  })
                }
              >
                <FaMinus className="text-[14px] transition-all" />
              </button>
              <span className="font-semibold text-brand-dark flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0 text-15px w-9">
                {cartItem.quantity}
              </span>
              <button
                className="group flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none !w-6 !h-6 border text-brand-muted border-border-three hover:bg-brand hover:border-brand rounded-full hover:text-brand-light !pr-0"
                title=""
                onClick={() =>
                  cartDispatch({
                    type: "CHANGE_CART_QTY",
                    payload: { ...cartItem, quantity: cartItem.quantity + 1 },
                  })
                }
              >
                <FaPlus className="text-[14px] transition-all" />
              </button>
            </div>
          </div>
          <div className="hidden md:flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
            ${cartItem.total.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="flex md:hidden justify-between items-center">
        <div className="flex items-center justify-between rounded overflow-hidden shrink-0 p-1">
          <button
            className="flex items-center justify-center shrink-0  transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none !w-6 !h-6 pr-0 border border-border-three hover:bg-brand text-brand-muted hover:border-brand rounded-full hover:text-brand-light"
            onClick={() =>
              cartDispatch({
                type: "CHANGE_CART_QTY",
                payload: { ...cartItem, quantity: cartItem.quantity - 1 },
              })
            }
          >
            <FaMinus className="text-[14px] transition-all" />
          </button>
          <span className="font-semibold text-brand-dark flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0 text-15px w-9">
            {cartItem.quantity}
          </span>
          <button
            className="group flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none !w-6 !h-6 border text-brand-muted border-border-three hover:bg-brand hover:border-brand rounded-full hover:text-brand-light !pr-0"
            title=""
            onClick={() =>
              cartDispatch({
                type: "CHANGE_CART_QTY",
                payload: { ...cartItem, quantity: cartItem.quantity + 1 },
              })
            }
          >
            <FaPlus className="text-[14px] transition-all" />
          </button>
        </div>
        <div className="font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end text-right">
          ${cartItem.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItemSm;
