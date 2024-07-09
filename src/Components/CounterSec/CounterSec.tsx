import CountUp from "react-countup";
import "./CounterSec.css";
import { useState, useEffect } from "react";
import AOS from "aos";

function CounterSec() {
  const [scrollAnm, setScrollAnm] = useState(false);
  const handleScrollFlag = () => {
    if (window.scrollY >= 100) {
      setScrollAnm(true);
    } else {
      setScrollAnm(false);
    }
  };
  useEffect(() => {
    handleScrollFlag();
    window.addEventListener("scroll", handleScrollFlag);
  });

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      data-aos="fade-in"
      data-aos-delay="200"
      data-aos-easing="ease-in"
      className="counterSec row d-flex justify-content-center align-items-center p-5 gap-4 gap-md-0"
    >
      <div className="first-counter col-12 col-md-4 counters__rightBorder counters__bottomBorder">
        <div className="d-flex align-items-center flex-column">
          {scrollAnm && (
            <>
              <span>
                <CountUp end={2000} duration={1.5} />+
              </span>
              <div>Students</div>
            </>
          )}
        </div>
      </div>
      <div className="second-counter col-12 col-md-4 counters__rightBorder counters__bottomBorder">
        <div className="d-flex align-items-center flex-column">
          {scrollAnm && (
            <>
              <span>
                <CountUp end={900} duration={1.5} />+
              </span>
              <div>Courses</div>
            </>
          )}
        </div>
      </div>
      <div className="third-counter col-12 col-md-4">
        <div className="d-flex align-items-center flex-column">
          {scrollAnm && (
            <>
              <span>
                <CountUp end={600} duration={1.5} />+
              </span>
              <div>Teachers</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CounterSec;
