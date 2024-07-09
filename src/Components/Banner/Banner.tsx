import { Carousel } from "antd";
import "./Banner.css";
import Model from "../Modal/Model";
import { useAppSelector } from "../../Hooks/ReduxHook";
import { User } from "../../Redux/Slices/UserSlice";

const imgSrcs: string[] = [
  `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url("./images/banner1.png")`,
  `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url("./images/banner2.png")`,
  `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url("./images/banner3.png")`,
  `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url("./images/banner4.png")`,
];

const Banner = () => {
  const { isLogged } = useAppSelector(User);
  return (
    <div className="position-relative banner-container">
      <Carousel swipeToSlide draggable autoplay>
        {imgSrcs.map((src, index) => (
          <div key={index}>
            <div
              style={{ backgroundImage: src }}
              className={`banner d-flex justify-content-start align-items-center`}
            ></div>
          </div>
        ))}
      </Carousel>
      <div className="position-absolute top-50 div--banner div--banner__translate">
        <div className="div--banner__text d-flex flex-column ms-0 ms-md-5 px-5 align-items-start gap-md-3">
          <div className="div--banner__green mb-0 mb-lg-2 mt-4 mt-lg-0">
            Learn and Earn...
          </div>
          <div className="div--banner__bigWhite">
            Unlock Your <br />
            Potential With Us
          </div>
          <div className="div--banner__smallWhite mt-1 mb-3 ">
            Discover a world of knowledge and skills at your fingertips with
            <br />
            York Press. Start your journey today!
          </div>
          {!isLogged && (
            <Model
              classCustom="btn--getStarted"
              clickString="Get Started"
            ></Model>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
