import { useParams } from "react-router-dom";

const CoursDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Cours Details</h1>
      <p>Cours ID: {id}</p>
    </div>
  );
};

export default CoursDetails;
