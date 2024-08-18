import React from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface RatingProps {
  rating: number;
  onClick?: (rate: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const RatingComponent: React.FC<RatingProps> = ({
  rating = 0,
  onClick,
  className,
  style,
}) => {
  const handleOnClick = (i: number) => {
    if (onClick) {
      onClick(i + 1);
    }
  };

  return (
    <div className="flex flex-row gap-1">
      {[...Array(5)].map((_, i) => {
        return (
          <span
            key={i}
            onClick={() => handleOnClick(i)}
            style={style}
            className={`${className} cursor-pointer `}
          >
            {rating > i ? (
              <IoStar className="text-amber-400 text-[18px]" />
            ) : (
              <IoStarOutline className="text-gray-400 text-[18px]" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingComponent;
