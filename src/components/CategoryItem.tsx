import React from "react";
import { CategoryColorModel } from "../models/CategoryModel";

interface CategoryProps {
  category: CategoryColorModel;
  onClickItem: (item: CategoryColorModel) => void;
}

const CategoryItem: React.FC<CategoryProps> = ({ category, onClickItem }) => {
  return (
    <>
      <div data-aos="fade-up" className="aos-init aos-animate">
        <div
          className="relative p-4 min-h-[160px] rounded-md shadow-md min-w-[160px] cursor-pointer active:scale-[.97] active:duration-300 transition-all hover:scale-[1.09] hover:duration-300  ease-in-out transform overflow-hidden"
          style={{
            backgroundColor: category.bgColor,
            background: `linear-gradient(to right, ${category.bgColor}, ${category.bgToColor})`,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: category.borderColor,
          }}
          onClick={() => onClickItem(category)}
        >
          <div className="text-gray-700 text-xl font-bold select-none absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            {category.name}
          </div>
          <div
            className="absolute -top-5 right-12 text-7xl"
            style={{ color: category.iconColor, opacity: "0.5" }}
          >
            {category.icon}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
