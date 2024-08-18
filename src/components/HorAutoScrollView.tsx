import React, { useEffect, useRef, useState } from "react";
import { CategoryColorModel, CategoryModel } from "../models/CategoryModel";

import {
  Colors200List,
  Colors300List,
  Colors400List,
} from "../utils/constants";

interface CategoryProps {
  categoryList: CategoryModel[];
  onCategorySelect: (category: CategoryColorModel) => void;
}

const HorAutoScrollView = ({
  categoryList = [],
  onCategorySelect,
}: CategoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [newCategoryList, setNewCategoryList] = useState<CategoryColorModel[]>(
    []
  );

  useEffect(() => {
    const newList: CategoryColorModel[] = categoryList.map((item, i) => {
      const newItem: CategoryColorModel = {
        ...item,
        bgColor: Colors200List[i % Colors200List.length],
        bgToColor: Colors300List[i % Colors200List.length],
        borderColor: Colors400List[i % Colors200List.length],
      };
      return newItem;
    });
    setNewCategoryList(newList);
    const container = containerRef.current;
    if (!container || isDragging) return;

    const itemWidth = container.scrollWidth / categoryList.length;

    const slide = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= itemWidth - 1) {
          container.scrollTo({ left: 0, behavior: "auto" });
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    };

    if (!isHovered) {
      const interval = setInterval(slide, 2000); // Slide every 2 seconds
      return () => clearInterval(interval); // Clean up on unmount or hover
    }
  }, [isHovered, isDragging]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && !isDragging) {
      container.scrollTo({
        left: currentIndex * (container.scrollWidth / categoryList.length),
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, [currentIndex, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      const itemWidth = container.scrollWidth / categoryList.length;
      const newIndex = Math.round(container.scrollLeft / itemWidth);
      setCurrentIndex(newIndex); // Update the current index to the new position
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleSelection = (item: CategoryColorModel) => {
    onCategorySelect(item);
  };

  return (
    <div
      className="overflow-hidden relative w-full h-auto md:h-40 content-center bg-white p-3 md:p-5 gap-2 md:gap-4 mb-8 md:mb-14"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <div className="flex space-x-6 items-stretch">
        {newCategoryList.length > 0 &&
          newCategoryList?.map((item, index) => {
            return (
              <div
                key={index}
                className="text-gray-800 p-4 rounded-md shadow-md min-w-[160px] text-center text-xl font-bold select-none cursor-pointer active:scale-[.97] active:duration-300 transition-all hover:scale-[1.09] hover:duration-300  ease-in-out transform"
                style={{
                  backgroundColor: item.bgColor,
                  background: `linear-gradient(to right, ${item.bgColor}, ${item.bgToColor})`,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: item.borderColor,
                }}
                onClick={() => handleSelection(item)}
              >
                {item.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HorAutoScrollView;
