import React, { useState } from "react";

interface Props {
  images: string[];
  title: string;
  description: string;
  price: number;
  key?: React.Key;
  onClick: () => void;
}

export default function Card({
  images,
  title,
  description,
  price,
  key,
  onClick,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? currentIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? currentIndex : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const getVisibleDots = (
    currentIndex: number,
    totalSlides: number
  ): number[] => {
    if (totalSlides <= 5) {
      return Array.from({ length: totalSlides }, (_, i) => i);
    }

    if (currentIndex <= 2) {
      return [0, 1, 2, 3, 4];
    } else if (currentIndex >= totalSlides - 3) {
      return Array.from({ length: 5 }, (_, i) => totalSlides - 5 + i);
    } else {
      return [
        currentIndex - 2,
        currentIndex - 1,
        currentIndex,
        currentIndex + 1,
        currentIndex + 2,
      ];
    }
  };

  const getDotSize = (index: number, currentIndex: number): string => {
    const distance = Math.abs(index - currentIndex);
    if (distance === 0) {
      return "30px";
    } else if (
      distance === 1 ||
      (currentIndex === 0 && index < 3) ||
      (currentIndex === images.length - 1 && index > images.length - 4)
    ) {
      return "23px";
    } else {
      return "19px";
    }
  };

  let summarizedText = description.substring(0, 75);
  summarizedText =
    summarizedText.substring(
      0,
      Math.min(summarizedText.length, summarizedText.lastIndexOf(" "))
    ) + " . . .";

  const numberWithComma = price.toLocaleString();

  const visibleDots = getVisibleDots(currentIndex, images.length);

  return (
    <div
      onClick={onClick}
      className="group flex flex-col m-0 h-[383.719px] w-[298.656px] rounded-2xl box-border bg-transparent mb-6"
      key={key && key}
    >
      <div className="min-h-[287.78925px] max-h-[287.78925px] relative rounded-2xl bg-gray-300">
        <img
          src={images[currentIndex]}
          alt={`image ${currentIndex}`}
          className="h-full w-full object-cover rounded-2xl"
        />
        <div className="w-full flex justify-center items-center absolute top-[95%] transform -translate-y-1/2">
          {visibleDots.map((index) => {
            const dotSize = getDotSize(index, currentIndex);
            return (
              <div
                key={index}
                className="text-gray-700 cursor-pointer"
                style={{
                  fontSize: dotSize,
                  transition: "font-size 0.15s ease",
                  color:
                    currentIndex === index
                      ? "rgb(255 255 255)"
                      : "rgb(55 65 81)",
                }}
              >
                •
              </div>
            );
          })}
        </div>
        {currentIndex > 0 && (
          <div
            className="absolute p-1 bg-white rounded-full top-[50%] transform -translate-y-1/2 text-black z-10 cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out left-[1%] group-hover:opacity-100"
            onClick={goToPrevious}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        )}
        {currentIndex < images.length - 1 && (
          <div
            className="absolute p-1 bg-white rounded-full top-[50%] transform -translate-y-1/2 text-black z-10 cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out right-[1%] group-hover:opacity-100"
            onClick={goToNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="px-1">
        <div className="mt-[15px] text-fontColor text-base font-semibold">
          {title}{" "}
        </div>
        <div className="flex flex-col text-sm text-gray-600">
          {summarizedText}{" "}
          <span className="mt-[3px] text-fontColor font-semibold text-base">{`ETB ${numberWithComma}`}</span>
        </div>
      </div>
    </div>
  );
}
