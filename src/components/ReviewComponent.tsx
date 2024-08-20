import React from "react";
import { Review } from "../models/ProductModel";
import RatingComponent from "./RatingComponent";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";

interface ReviewProps {
  review: Review | undefined;
}

const ReviewComponent: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md bg-white">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 flex justify-center items-center rounded-full border border-gray-300">
          <FaUser className="text-gray-300 text-[26px]" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {review?.reviewerName}
          </h3>
          <div className="flex flex-col md:flex-row gap-x-2 items-baseline">
            <div className="flex gap-2 items-baseline">
              <RatingComponent rating={Math.round(review?.rating ?? 0)} />(
              <span className="text-gray-600 font-semibold">
                {review?.rating}
              </span>
              )
            </div>
            <p className="flex gap-x-2 text-gray-400 text-sm items-baseline mt-2">
              {" "}
              <FaRegCalendarAlt />{" "}
              {new Date(review?.date ?? new Date()).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review?.comment}</p>
    </div>
  );
};

export default ReviewComponent;
