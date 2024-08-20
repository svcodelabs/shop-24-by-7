import React, { useEffect, useMemo } from "react";
import { useProductContext } from "../context/ProductContext";
import { FaXmark } from "react-icons/fa6";
import CartItemSm from "./CartItemSm";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CartProductModel } from "../models/CartModel";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebarComponent: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    cartState: { cart },
  } = useProductContext();
  // const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTotal(cart.reduce((acc, cur) => acc + Number(cur.total), 0));
  // }, [cart]);

  const total = useMemo(() => {
    return cart.reduce((acc, cur) => acc + Number(cur.total), 0);
  }, [cart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup function to reset the overflow when the component unmounts or when isOpen changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleViewItem = (item: CartProductModel) => {
    navigate(`/products/${item.id}`);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black transition-opacity duration-500 ease-in-out ${
            isOpen
              ? "bg-opacity-35 opacity-100 pointer-events-auto"
              : "bg-opacity-0 opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/3 h-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-lg md:text-xl text-medium md:font-bold text-gray-600">
              Shopping Cart
            </div>
            <div className="grow flex gap-2 items-center pl-2">
              <span className="text-lg text-white font-[600] border bg-purple-600 rounded-full px-2">
                {cart.length}{" "}
                <span className="font-[400] text-base text-white">
                  {cart.length > 1 ? "Items" : "Item"}
                </span>
              </span>
            </div>
            <FaXmark
              className="h-6 w-6 cursor-pointer text-gray-500 hover:text-rose-500"
              onClick={onClose}
            />
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartItemSm
                  key={index}
                  cartItem={item}
                  onClickView={() => handleViewItem(item)}
                />
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
          <div className="p-2 md:p-4 border-t">
            <div className="p-1 md:px-4">
              <div className="flex justify-between items-center mb-5">
                <span className="text-base font-medium text-gray-600">
                  Subtotal
                </span>
                <span className="text-base font-semibold text-rose-500 ">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="product-action-btn">
                <button
                  type="button"
                  className="bg-gray-200 w-full h-12 mb-3 flex justify-center items-center rounded-md hover:bg-gray-300 transition-all duration-200 ease-in-out"
                  onClick={() => {
                    navigate("/cart");
                    onClose();
                  }}
                >
                  <span className="text-base font-semibold">View Cart</span>
                </button>
                <button
                  type="button"
                  className="w-full h-12 bg-purple-600 flex justify-center text-white items-center rounded-md hover:bg-purple-500 transition-all duration-200 ease-in-out"
                  onClick={() => {
                    navigate("/checkout");
                    onClose();
                  }}
                >
                  <span className="text-base font-semibold">Checkout Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebarComponent;
