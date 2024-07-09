import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HelpSec.css";
import Aos from "aos";

function HelpSec() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="HelpSec container d-flex justify-content-evenly my-2 p-2 p-md-5 flex-wrap flex-md-nowrap gap-4 gap-md-0">
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        className="d-flex flex-column align-items-start justify-content-center "
      >
        <h2 className="">Help students become superheroes!</h2>
        <p className="">
          Join our highly supportive Professional Learning Program for middle
          and high school educators.
        </p>
        <Link className="" to="/">
          <button className="btn btn-primary">Learn More</button>
        </Link>
      </div>
      <figure
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-easing="ease-in"
        className="d-flex align-items-center justify-content-center"
      >
        <img
          className="img-fluid w-75 rounded-pill"
          src="./images/helpsec.png"
        />
      </figure>
    </section>
  );
}

export default HelpSec;
