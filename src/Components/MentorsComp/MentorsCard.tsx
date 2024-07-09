import "./MentorsCards.css";
import {
  LinkedinFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from "@ant-design/icons";

type Props = {
  img: string;
  name: string;
};

function MentorsCard({ img, name }: Props) {
  return (
    <>
      <div className="image overflow-hidden rounded position-relative m-2">
        <div className="overlay-blue d-flex flex-column justify-content-between p-3">
          <div className="text-white d-flex align-items-center gap-2 ">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="text-white"
            >
              <FacebookFilled />
            </a>
            <a href="https://www.twitter.com/" className="text-white">
              <TwitterCircleFilled />
            </a>

            <a href="https://www.linkedin.com/" className="text-white">
              <LinkedinFilled />
            </a>
          </div>
          <div className="text text-white">
            <p className="fw-bold text-uppercase m-0">{name}</p>
            <p>Sales Manager</p>
          </div>
        </div>
        <img src={img} alt="1" className="w-100" />
      </div>
    </>
  );
}

export default MentorsCard;
