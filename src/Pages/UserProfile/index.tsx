import RequiredForm from "../../Components/EditProfile/RequiredForm/RequiredForm";
// import OptionalForm from "../../Components/OptionalForm/OptionalForm";
// import FavoritesTopics from "../../Components/FavoritesTopics/FavoritesTopics";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Col, Row } from "react-bootstrap";
import OptionalForm from "../../Components/EditProfile/OptionalForm/OptionalForm";
import FavoritesTopics from "../../Components/EditProfile/FavoritesTopics/FavoritesTopics";
import EditProfileSide from "../../Components/EditProfile/EditProfileSide/EditProfileSide";
import { useAppSelector } from "../../Hooks/ReduxHook";
import { User } from "../../Redux/Slices/UserSlice";

export default function UserProfile() {
  const { isLogged } = useAppSelector(User);
  return (
    <>
      {isLogged && (
        <Row xs={12}>
          <h4>Personal Details</h4>
          <Col md={3} className="my-4">
            <EditProfileSide />
          </Col>
          <Col md={9} className="mt-4">
            <RequiredForm />
            <OptionalForm />
            <FavoritesTopics />
          </Col>
        </Row>
      )}
    </>
  );
}
