import { useState } from "react";
import styles from "./ImageSlider.module.css";

interface Props {
  slides: string[];
}

export default function ImageSlider({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < slides.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
      return "40px";
    } else if (
      distance === 1 ||
      (currentIndex === 0 && index < 3) ||
      (currentIndex === slides.length - 1 && index > slides.length - 4)
    ) {
      return "33px";
    } else {
      return "25px";
    }
  };

  const visibleDots = getVisibleDots(currentIndex, slides.length);

  return (
    <div className={styles.mainContainer}>
      {currentIndex > 0 && (
        <div
          className={[styles.arrowStyle, styles.leftArrowStyle].join(" ")}
          onClick={goToPrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
      )}
      {currentIndex < slides.length - 1 && (
        <div
          className={[styles.arrowStyle, styles.rightArrowStyle].join(" ")}
          onClick={goToNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      )}
      <div
        className={[styles.slideStyle, "flex items-center justify-center"].join(
          " "
        )}
      >
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div className={styles.dotContainer}>
        {visibleDots.map((index) => {
          const dotSize = getDotSize(index, currentIndex);
          return (
            <div
              key={index}
              className={styles.dotStyle}
              style={{
                fontSize: dotSize,
                color: currentIndex === index ? "#ababab" : "#545454",
              }}
              onClick={() => goToSlide(index)}
            >
              •
            </div>
          );
        })}
      </div>
    </div>
  );
}
