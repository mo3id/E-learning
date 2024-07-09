import { useEffect } from "react";
import "./MentorsComp.css";
import SliderComp from "../CustomComponents/SliderComp";
import Aos from "aos";
import MentorsCard from "./MentorsCard";

const elementsToView = [
  <MentorsCard name="Claire Temple" img="./images/person1.png" />,
  <MentorsCard name="Claire Temple" img="./images/person2.png" />,
  <MentorsCard name="Claire Temple" img="./images/person1.png" />,
  <MentorsCard name="Claire Temple" img="./images/person2.png" />,
  <MentorsCard name="Claire Temple" img="./images/person1.png" />,
  <MentorsCard name="Claire Temple" img="./images/person2.png" />,
  <MentorsCard name="Claire Temple" img="./images/person1.png" />,
  <MentorsCard name="Claire Temple" img="./images/person2.png" />,
];

function MentorsComp() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="MentorsCompSec d-flex pt-3 pb-3 justify-content-center align-items-center flex-column">
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        className="d-none d-md-block mb-2 SpecialCoursesSec--title main-title text-algin"
      >
        <h1>Teachers</h1>
        <h2>Our Talented Mentors</h2>
      </div>

      {/* view mobile 768 */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        className="d-block d-md-none SpecialCoursesSec--title text-nowrap w-100 text-center "
      >
        <h1>Our Talented Mentors</h1>
      </div>
      <div
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        className="w-100 position-relative"
      >
        <SliderComp
          sliderWidth="w-50"
          slidesToShow={3}
          elementsToView={elementsToView}
        />
      </div>
    </section>
  );
}

export default MentorsComp;
