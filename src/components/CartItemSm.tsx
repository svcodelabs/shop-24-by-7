import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { CartProductModel } from "../models/CartModel";
import { useProductContext } from "../context/ProductContext";

interface CartProps {
  cartItem: CartProductModel;
}

const CartItemSm: React.FC<CartProps> = ({ cartItem }) => {
  const { cartDispatch } = useProductContext();

  return (
    <div
      className="group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0"
      title="Frito Lay's Family Fun Mix Snacks"
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <img
          alt="Frito Lay's Family Fun Mix Snacks"
          loading="eager"
          width="100"
          height="100"
          decoding="async"
          data-nimg="1"
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
          <a
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-rose-500"
            href={`/products/${cartItem.id}`}
          >
            {cartItem.title}
          </a>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            1 item (${cartItem.price}) X {cartItem.quantity}
          </div>
          <div className="items-center justify-between rounded overflow-hidden shrink-0 p-1 inline-flex">
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
        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
          {cartItem.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItemSm;
