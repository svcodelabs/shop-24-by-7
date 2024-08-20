import React, { useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

interface ImageSliderProps {
  images: string[];
}

const ProductImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1)
      //(prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setIsLoading(true); // Set loading state to true when changing image
  };

  const handleNextClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)
      // (prevIndex) => (prevIndex + 1) % images.length
    );
    setIsLoading(true); // Set loading state to true when changing image
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLoading(true); // Set loading state to true when changing image
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col-reverse md:flex-row">
      {/* Thumbnails */}
      <div className="flex flex-row space-x-2 md:flex-col md:space-y-2 mt-4 md:mr-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden ${
              currentImageIndex === index ? "ring-2 ring-rose-500" : ""
            }`}
          >
            <img
              loading="lazy"
              decoding="async"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full h-64 md:h-96 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          loading="lazy"
          decoding="async"
          src={images[currentImageIndex]}
          alt={`Product ${currentImageIndex + 1}`}
          className={`w-full h-full object-contain rounded-lg ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500 ease-in-out`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />

        <button
          onClick={handlePrevClick}
          aria-label="Previous Image"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md"
        >
          <IoArrowBackOutline className="text-purple-500 text-2xl" />
        </button>
        <button
          onClick={handleNextClick}
          aria-label="Next Image"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md"
        >
          <IoArrowForwardOutline className="text-purple-500 text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ProductImageSlider;
