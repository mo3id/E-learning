import { Rate } from "antd";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CardComp.css";
import { Tooltip } from "antd";

type CardType = {
  width: string;
  dataObject: {
    photo: string | "./images/payhton";
    tittle: string;
    stars: number;
    description: string;
    author: string;
    date: string | "";
    price: number | "30";
    rate: string;
  };
};

function CardComp({ dataObject, width }: CardType) {
  return (
    <Card style={{ width: width }} className="cardComp mx-1 p-1">
      <Card.Img variant="top" src={`${dataObject.photo}`} className="cardImgHome" />
      <Card.Body className="contentCard">
        <div className="headDiv d-flex justify-content-center justify-content-xl-between flex-wrap h-100 ">
          <Card.Title className="cardTitle truncate mb-0">
            <Tooltip placement="topLeft" title={dataObject.tittle}>
              {dataObject.tittle}
            </Tooltip>
          </Card.Title>
          <Rate
            allowHalf
            disabled
            defaultValue={parseFloat(dataObject.rate)}
            className="stars"
          />
        </div>
        <Card.Text className="mt-2" style={{ height: "8rem" }}>
          {dataObject.description.slice(0, 100)}...
        </Card.Text>
        <div className="cardAuthorAndDate mt-0 pt-1 px-0 d-flex justify-content-between">
          <div className="ps--lg-2 ps-0 div--author">
            <p className="pb-0 mb-0">By {dataObject.author}</p>
            <p className="pb-0 mb-0 text-nowrap">Updated May 2023</p>
          </div>
          <div className="div--price mb-0 pb-0">
            <p className="pb-0 pe-lg-2  pe-0 mb-0 ">{30}$</p>
          </div>
        </div>
        <div>
          <Button className="CourseCardBtnColor mb-1 mt-2" variant="primary">
            Go somewhere
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardComp;
