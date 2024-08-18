import React, { useState } from "react";

interface SliderProps {
  selectionItems: string[];
  onSelectItem: (key: string) => void;
}

const SelectionSlider: React.FC<SliderProps> = ({
  selectionItems,
  onSelectItem,
}) => {
  const [selection, setSelection] = useState<string>("New Arrivals");

  const handleSelection = (item: string) => {
    setSelection(item);
    onSelectItem(item);
  };

  return (
    <div className="w-full flex justify-center content-center px-4 py-1 md:p-4">
      <div className="relative w-full h-10 p-1 md:w-1/2 lg:1/3 md:h-16 md:p-2 rounded-full border-[1px] md:border-2 border-purple-500 flex overflow-hidden">
        {/* Sliding Indicator */}
        <div
          className="absolute top-0 left-0 h-full bg-purple-500 rounded-full transition-transform duration-300 ease-out"
          style={{
            width: `calc(100% / ${selectionItems.length})`,
            transform: `translateX(${
              selectionItems.indexOf(selection) * 100
            }%)`,
          }}
        ></div>
        {/* Button Items */}
        {selectionItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`relative z-10 grow h-full rounded-full flex justify-center items-center text-base font-medium md:text-lg md:font-bold cursor-pointer ${
                selection === item
                  ? "text-white"
                  : "text-purple-500 hover:text-purple-600 active:scale-[.97] active:duration-300 transition-all hover:scale-[1.09] hover:duration-300  ease-in-out transform"
              }  `}
              onClick={() => handleSelection(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionSlider;
