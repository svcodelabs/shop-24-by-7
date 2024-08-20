import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { CategoryColorModel, CategoryModel } from "../models/CategoryModel";

import {
  Colors200List,
  Colors300List,
  Colors400List,
  Colors600List,
} from "../utils/constants";
import CategoryItem from "./CategoryItem";
import { BsCart2 } from "react-icons/bs";
import { FaPercent } from "react-icons/fa";
import { HiMiniPaperClip } from "react-icons/hi2";
import {
  IoBagOutline,
  IoBuildOutline,
  IoDiamondOutline,
  IoExtensionPuzzleOutline,
  IoFlagOutline,
  IoGolfOutline,
  IoBulbOutline,
  IoBookmarksOutline,
  IoLayersOutline,
  IoPaperPlaneOutline,
  IoRadioOutline,
  IoShirtOutline,
  IoStarOutline,
  IoSettingsOutline,
  IoGridOutline,
} from "react-icons/io5";
import { LuBadgePercent } from "react-icons/lu";
import useBreakpoint from "../hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  categoryList: CategoryModel[];
  onCategorySelect: (category: CategoryColorModel) => void;
}

const HorAutoScrollView: React.FC<CategoryProps> = ({
  categoryList = [],
  onCategorySelect,
}) => {
  const navigate = useNavigate();
  const [newCategoryList, setNewCategoryList] = useState<CategoryColorModel[]>(
    []
  );
  const breakpoint = useBreakpoint();

  const iconsArray: ReactElement[] = [
    <BsCart2 />,
    <LuBadgePercent />,
    <HiMiniPaperClip />,
    <FaPercent />,
    <IoBagOutline />,
    <IoBuildOutline />,
    <IoDiamondOutline />,
    <IoExtensionPuzzleOutline />,
    <IoFlagOutline />,
    <IoGolfOutline />,
    <IoBulbOutline />,
    <IoBookmarksOutline />,
    <IoLayersOutline />,
    <IoPaperPlaneOutline />,
    <IoRadioOutline />,
    <IoShirtOutline />,
    <IoStarOutline />,
    <IoSettingsOutline />,
  ];

  const loadNewCategoriesList = () => {
    const newList: CategoryColorModel[] = categoryList.map((item, i) => {
      const newItem: CategoryColorModel = {
        ...item,
        bgColor: Colors200List[i % Colors200List.length],
        bgToColor: Colors300List[i % Colors300List.length],
        borderColor: Colors400List[i % Colors400List.length],
        icon: iconsArray[i % iconsArray.length],
        iconColor: Colors600List[i % Colors600List.length],
      };
      return newItem;
    });
    return newList;
  };

  const newList: CategoryColorModel[] = useMemo(
    () => loadNewCategoriesList(),
    [categoryList]
  );

  useEffect(() => {
    setNewCategoryList(newList);
  }, [categoryList]);

  const handleSelection = (item: CategoryColorModel) => {
    onCategorySelect(item);
  };

  let itemsToDisplay;
  switch (breakpoint) {
    case "2xl":
      itemsToDisplay = newCategoryList.slice(0, 5);
      break;
    case "xl":
      itemsToDisplay = newCategoryList.slice(0, 4);
      break;
    case "lg":
      itemsToDisplay = newCategoryList.slice(0, 3);
      break;
    case "md":
      itemsToDisplay = newCategoryList.slice(0, 2);
      break;
    default:
      itemsToDisplay = newCategoryList.slice(0, 3);
  }

  return (
    <>
      {itemsToDisplay.length > 0 && (
        <div className=" relative w-full h-auto md:h-40 content-center bg-white p-3 md:p-5 gap-2 md:gap-4 mb-8 md:mb-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {itemsToDisplay.map((item, i) => {
              return (
                <CategoryItem
                  key={i}
                  category={item}
                  onClickItem={handleSelection}
                />
              );
            })}
            <div data-aos="fade-up" className="aos-init aos-animate">
              <div
                className="relative p-4 min-h-28 min-w-28 md:min-h-40 md:min-w-40 rounded-md shadow-md cursor-pointer active:scale-[.97] active:duration-300 transition-all hover:scale-[1.03] hover:duration-300  ease-in-out transform overflow-hidden bg-gray-200 bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-400"
                onClick={() => navigate("/categories")}
              >
                <div className="text-gray-700 underline underline-offset-4 text-lg md:text-xl w-full text-center font-semibold md:font-bold select-none absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  View All
                </div>
                <div className="absolute -top-7 md:-top-5 right-9 md:right-12 text-6xl md:text-7xl text-gray-600 opacity-50">
                  <IoGridOutline />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HorAutoScrollView;
