import React from "react";
import { IoClose } from "react-icons/io5";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FilterDrawerComponent: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
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
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose}>
              <IoClose size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4">{children}</div>

          {/* Footer */}
          {/* <div className="p-4 border-t">
            <button
              onClick={onClose}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md"
            >
              Apply Filters
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FilterDrawerComponent;
