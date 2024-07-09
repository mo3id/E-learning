import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CoursesCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import SliderComp from "../CustomComponents/SliderComp";
import Aos from "aos";

type DivCategoryProps = {
  title?: string | "";
  desc?: string | "";
};

const DivCategory: React.FC = ({
  title = "Desgin Sector",
  desc = "30+ Courses",
}: DivCategoryProps) => {
  return (
    <div className="boxElement d-flex justify-content-center align-items-center p-1 w-100 flex-column">
      <h3 className="text-nowrap pt-5">{title}</h3>
      <p className="mb-0 pb-5">{desc}</p>
    </div>
  );
};

const elementsToView = [
  <DivCategory />,
  <DivCategory />,
  <DivCategory />,
  <DivCategory />,
  <DivCategory />,
  <DivCategory />,
  <DivCategory />,
];

function CoursesCategory() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section
      data-aos="fade-in"
      data-aos-delay="200"
      data-aos-easing="ease-in"
      className="coursesCategorySec d-flex pt-5 pb-5 justify-content-center align-items-center flex-column"
    >
      <div className="container w-75 mb-3 d-flex justify-content-between align-items-center flex-wrap gap-1">
        <h2>Explore Courses By Category</h2>
        <button className="viewAllBtn">
          <Link to="categories">View All</Link>
        </button>
      </div>
      <div className="w-100">
        <SliderComp
          sliderWidth="w-75"
          slidesToShow={4}
          className="p-2"
          elementsToView={elementsToView}
          nextArrow={<FontAwesomeIcon icon={faAngleRight} />}
          prevArrow={<FontAwesomeIcon icon={faAngleLeft} />}
        />
      </div>
    </section>
  );
}

export default CoursesCategory;
