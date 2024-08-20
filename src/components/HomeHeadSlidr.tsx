import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface SliderProps {
  slides: {
    title: string;
    description: string;
    imageUrl: string;
    buttonLabel: string;
    buttonUrl: string;
  }[];
  autoSlide?: boolean;
  autoSlideInterval?: number; // in milliseconds
}

const HomeHeadSlider: React.FC<SliderProps> = ({
  slides,
  autoSlide = true,
  autoSlideInterval = 3000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!isHovered && autoSlide) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [currentSlide, isHovered]);

  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval
    slideInterval.current = setInterval(() => {
      handleNextSlide();
    }, autoSlideInterval);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ width: "100%" }}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute w-3/4 top-1/2 left-12 p-3 md:w-2/3 md:top-1/2 md:left-20 md:p-10 lg:w-1/3 transform -translate-y-1/2  border-gray-50 bg-white bg-opacity-55 rounded-lg">
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <h2 className="text-lg md:text-xl font-medium lg:text-3xl md:font-bold">
                  {slide.title}
                </h2>
                <p className="text-base font-medium hidden md:block md:text-xl md:font-medium">
                  {slide.description}
                </p>
                <div>
                  <button className="px-3 py-1 md:px-5 md:py-3 flex-auto bg-purple-600 text-white text-sm md:text-base font-medium rounded-md">
                    {slide.buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 "
      >
        <div className="p-2 md:p-4 flex justify-center content-center items-center">
          <IoIosArrowDropleft className="text-purple-500 size-6 md:size-12 cursor-pointer active:scale-[.97] active:duration-150 transition-all hover:scale-[1.09]  ease-in-out transform" />
        </div>
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 "
      >
        <div className=" p-2 md:p-4 flex justify-center content-center items-center">
          <IoIosArrowDropright className="text-purple-500 size-6 md:size-12 cursor-pointer active:scale-[.97] active:duration-150 transition-all hover:scale-[1.09]  ease-in-out transform" />
        </div>
      </button>
    </div>
  );
};

export default HomeHeadSlider;
