import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";
import CartItemSm from "./CartItemSm";
import { useProductContext } from "../context/ProductContext";
import { IoCartOutline } from "react-icons/io5";

interface CartDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawerComponent: React.FC<CartDrawerProps> = ({ open, setOpen }) => {
  const {
    cartState: { cart },
  } = useProductContext();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.total), 0));
  }, [cart]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-300 ease-in-out data-[closed]:translate-x-full sm:duration-500"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    {/* <FaXmark aria-hidden="true" className="h-6 w-6" /> */}
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                {/* Header */}
                <div className="px-4 sm:px-6 ">
                  <div className="flex flex-row gap-2 mb-3">
                    <div className="text-xl font-bold text-gray-600">
                      Shopping Cart
                    </div>
                    <div className="grow flex gap-2 items-center pl-2">
                      <span className="text-lg text-white font-[600] border bg-purple-500 rounded-full px-2">
                        {cart.length}{" "}
                        <span className="font-[400] text-base text-white">
                          {cart.length > 1 ? "Items" : "Item"}
                        </span>
                      </span>
                    </div>
                    <FaXmark
                      aria-hidden="true"
                      className="h-6 w-6 cursor-pointer text-gray-500 hover:text-rose-500"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <hr />
                </div>
                <div className="flex-grow overflow-y-auto p-4">
                  {cart.length > 0 ? (
                    cart.map((item, index) => (
                      <CartItemSm key={index} cartItem={item} />
                    ))
                  ) : (
                    <div className="flex flex-col justify-center self-center items-center my-12">
                      <IoCartOutline className="text-[10rem] text-gray-300" />
                      <p className="p-5 text-xl font-bold text-gray-300">
                        Your cart is empty.
                      </p>
                    </div>
                  )}
                </div>
                {/* Footer */}
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <hr />
                  <div className="h-full w-full">
                    <div className="px-4 mb-4"></div>
                    <div className="px-4 mb-4">
                      <div className="flex justify-between items-center mb-[28px]">
                        <span className="text-base font-medium text-gray-600">
                          Subtotal
                        </span>
                        <span className="text-base font-semibold text-rose-500 ">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <div className="product-action-btn">
                        <a href="#">
                          <div className="bg-gray-200 w-full h-[50px] mb-[10px] flex justify-center items-center rounded-md">
                            <span className="text-base font-semibold">
                              View Cart
                            </span>
                          </div>
                        </a>
                        <a href="#">
                          <div className="w-full h-[50px]">
                            <div className="bg-purple-500 flex justify-center text-white h-full items-center rounded-md">
                              <span className="text-base font-semibold">
                                Checkout Now
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CartDrawerComponent;
