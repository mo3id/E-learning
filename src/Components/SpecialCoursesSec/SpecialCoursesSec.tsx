import { useEffect } from "react";
import SliderComp from "../CustomComponents/SliderComp";
import "./SpecialCoursesSec.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import CardComp from "../CustomComponents/CardComp";
import Aos from "aos";
import { useAppSelector } from "../../Hooks/ReduxHook";
import { HomePage } from "../../Redux/Slices/HomePageSlice";

function SpecialCoursesSec() {
  const { coursesData, loading } = useAppSelector(HomePage);

  useEffect(() => {
    Aos.init();
  }, []);

  const elementsToView = coursesData.map((course) => (
    <CardComp width="17rem" dataObject={course} />
  ));

  return (
    <section className="specialCoursesSec d-flex justify-content-center align-items-center flex-column text-center gap-2 pt-5 pb-5">
      <div
        className="d-none d-md-block SpecialCoursesSec--title main-title text-algin"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        data-aos="fade-up"
      >
        <h1>courses</h1>
        <h2>Our Special Courses</h2>
      </div>
      <div
        className="d-none d-md-block SpecialCoursesSecTitle mb-3"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        data-aos="fade-up"
      >
        <div className="SpecialCoursesSec--title--text">
          <span>
            Discover an extensive selection of courses at York Press that cater
            your interests and learning goals. We offer a wide range of
            subjects, ensuring there’s something for everyone.
          </span>
        </div>
      </div>
      {/* view mobile 768 */}
      <div
        className="d-block d-md-none SpecialCoursesSec--title "
        data-aos-delay="200"
        data-aos-easing="ease-in"
        data-aos="fade-up"
      >
        <h1>Our Special Courses</h1>
        <div className="SpecialCoursesSec--title--text">
          Discover an extensive selection of courses at York Press that cater
          your interests and learning goals. We offer a wide range of subjects,
          ensuring there’s something for everyone.
        </div>
      </div>
      <div
        className="w-100"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        data-aos="fade-up"
      >
        {!loading.coursesLoading && (
          <SliderComp
            sliderWidth="w-50"
            slidesToShow={3}
            elementsToView={elementsToView}
            nextArrow={<FontAwesomeIcon icon={faAngleRight} />}
            prevArrow={<FontAwesomeIcon icon={faAngleLeft} />}
          />
        )}
      </div>
    </section>
  );
}

export default SpecialCoursesSec;
