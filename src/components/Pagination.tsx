import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginateProps {
  itemsLength: number;
  limit: number;
  skip: number;
  handlePage: (skipNo: number) => void;
}

const Pagination: React.FC<PaginateProps> = ({
  itemsLength,
  limit,
  skip,
  handlePage,
}) => {
  const totalPages = Math.floor(itemsLength / limit);
  const page = (skip + limit) / limit;
  return (
    <div>
      {itemsLength > 0 && (
        <div className="flex flex-row gap-x-4 justify-center content-center">
          <div
            onClick={() => handlePage(skip - limit)}
            className={`cursor-pointer w-6 h-6 flex justify-center content-center items-center border-2 border-purple-600 rounded-full hover:bg-purple-200 ${
              page > 1 ? "" : "hidden"
            }`}
          >
            <FaAngleLeft className="text-purple-600 text-lg" />
          </div>
          <p>
            <span className="text-base font-medium">
              {skip + 1} -{" "}
              {limit + skip < itemsLength ? limit + skip : itemsLength}
            </span>
            <span> of </span>
            <span className="text-base font-medium">{itemsLength}</span>
          </p>
          <div
            onClick={() => handlePage(skip + limit)}
            className={`cursor-pointer w-6 h-6 flex justify-center content-center items-center border-2 border-purple-600 rounded-full hover:bg-purple-200 ${
              page < totalPages ? "" : "hidden"
            }`}
          >
            <FaAngleRight className="text-purple-600 text-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
