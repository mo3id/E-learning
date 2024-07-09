import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderComp.css";

type SliderProps = {
  nextArrow?: React.ReactElement | undefined;
  prevArrow?: React.ReactElement | undefined;
  elementsToView: React.ReactElement[];
  className?: string | "";
  slidesToShow: number;
  sliderWidth: string;
  dots?: boolean;
};

function SliderComp({
  nextArrow,
  prevArrow,
  elementsToView,
  className,
  slidesToShow,
  sliderWidth,
  dots = false,
}: SliderProps) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow,
    prevArrow,
    dots,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="sliderComp d-flex flex-column justify-content-center align-items-center  ">
      <div
        className={`${sliderWidth} d-flex justify-content-center align-items-center`}
      >
        <Slider {...settings}>
          {elementsToView.map((item, index) => (
            <div
              key={index}
              className={`d-flex  justify-content-center align-items-center h-100 ${className}`}
            >
              {item}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderComp;
