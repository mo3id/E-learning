import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner/Banner";
import CounterSec from "../../Components/CounterSec/CounterSec";
import SpecialCoursesSec from "../../Components/SpecialCoursesSec/SpecialCoursesSec";
import CoursesCategory from "../../Components/CoursesCategory/CoursesCategory";
import MentorsComp from "../../Components/MentorsComp/MentorsComp";
import HelpSec from "../../Components/HelpSec/HelpSec";
import Footer from "../../Components/Footer/Footer";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJetFighterUp } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { handleCourseCards } from "../../Redux/Slices/HomePageSlice";
import { useAppDispatch } from "../../Hooks/ReduxHook";

const Home: React.FC = () => {
  const [showBtn, setShowBtn] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleCourseCards());
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="HomePage">
      <Banner />
      <CounterSec />
      <SpecialCoursesSec />
      <CoursesCategory />
      <MentorsComp />
      <HelpSec />
      <Footer />
      {showBtn && (
        <div className="plane">
          <div className="fixed-right" onClick={goToTop}>
            <FontAwesomeIcon icon={faJetFighterUp} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
