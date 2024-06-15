import { useState } from "react";
import ImageSlider from "../ImageSlider";

interface Props {
  imageUrls: string[];
}

export default function ImageGrid({ imageUrls }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getClassName = (index: number, length: number): string => {
    const baseClasses = "cursor-pointer h-full w-full object-cover";

    if (length >= 5) {
      switch (index) {
        case 0:
          return `${baseClasses} row-span-2 col-span-2 rounded-s-2xl`;
        case 1:
          return `${baseClasses} row-span-1`;
        case 2:
          return `${baseClasses} row-span-1 rounded-se-2xl`;
        case 3:
          return `${baseClasses} row-span-1`;
        case 4:
          return `${baseClasses} row-span-1 rounded-ee-2xl`;
        default:
          return baseClasses;
      }
    } else if (length === 4) {
      switch (index) {
        case 0:
          return `${baseClasses} row-span-2 col-span-2 rounded-s-2xl`;
        case 1:
          return `${baseClasses} row-span-1`;
        case 2:
          return `${baseClasses} row-span-1 rounded-se-2xl`;
        case 3:
          return `${baseClasses} row-span-1 col-span-2 rounded-ee-2xl`;
        default:
          return baseClasses;
      }
    } else if (length === 3) {
      switch (index) {
        case 0:
          return `${baseClasses} row-span-2 col-span-2 rounded-s-2xl`;
        case 1:
          return `${baseClasses} row-span-1 col-span-2 rounded-se-2xl`;
        case 2:
          return `${baseClasses} row-span-1 col-span-2 rounded-ee-2xl`;
        default:
          return baseClasses;
      }
    } else if (length === 2) {
      switch (index) {
        case 0:
          return `${baseClasses} row-span-2 col-span-2 rounded-s-2xl`;
        case 1:
          return `${baseClasses} row-span-2 col-span-2 rounded-e-2xl`;
        default:
          return baseClasses;
      }
    } else {
      return `${baseClasses} row-span-2 col-span-4 rounded-2xl`;
    }
  };

  const openSlider = () => {
    setIsOpen(true);
  };

  const closeSlider = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[200px] sm:h-[550px] mt-4 rounded-2xl">
        {imageUrls.slice(0, 5).map((url, index) => {
          return (
            <img
              key={index}
              src={url}
              alt={`image ${index + 1}`}
              className={getClassName(index, imageUrls.length)}
              onClick={openSlider}
            />
          );
        })}
      </div>

      {isOpen && (
        <div
          className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-10 bg-black/75"
          onClick={closeSlider}
        >
          <div
            className="w-9/12 h-5/6"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
            }}
          >
            <ImageSlider slides={imageUrls} />
          </div>
        </div>
      )}
    </div>
  );
}
