import { Col, Image, Row } from "react-bootstrap";
import classes from "./FavoritesTopics.module.css";
import { useState } from "react";

interface FavImage {
  id: number;
  src: string;
  category?: string;
}

const FavoritesTopics = () => {
  const FAV_IMAGES: FavImage[] = [
    {
      id: Math.random(),
      src: "./images/banner1.png",
      category: "web develobment",
    },
    {
      id: Math.random(),
      src: "./images/banner2.png",
      category: "web develobment",
    },
    {
      id: Math.random(),
      src: "./images/banner1.png",
      category: "web develobment",
    },
    {
      id: Math.random(),
      src: "./images/banner2.png",
      category: "web develobment",
    },
  ];

  const [selectedImages, setlectedImages] = useState<FavImage[]>([]);

  const toggleFav = (id: number, src: string) => {
    const ind = FAV_IMAGES.findIndex((ele) => ele.id === id);
    if (ind > -1) {
      // Item is already in the array, so remove it
      setlectedImages(selectedImages.filter(({ id }) => id !== id));
    } else {
      // Item is not in the array, so add it
      setlectedImages([...selectedImages, { id: id, src: src }]);
    }
  };

  const imagesList = FAV_IMAGES.map((image) => (
    <Col key={image.id} md={3} className={classes.category}>
      <Image
        onClick={() => toggleFav}
        className={`${classes.favImg} mb-1`}
        src={image.src}
      />
      <h6>{image.category}</h6>
    </Col>
  ));

  return (
    <div className={`${classes.favoritesTopics} p-3`}>
      <h5 className={`mb-4 ${classes.selectTitle}`}>
        Select 5 of your favorites topics
      </h5>
      <Row className={classes.imagesList}>{imagesList}</Row>
    </div>
  );
};

export default FavoritesTopics;
