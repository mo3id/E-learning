import { Select, Typography, DatePicker, Switch } from "antd";
import type { SelectProps, DatePickerProps } from "antd";
import { Form, Row, Col } from "react-bootstrap";
import classes from "./OptionalForm.module.css";

const { Title } = Typography;

const handleChange = (value: { value: string; label: React.ReactNode }) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const onChangeNotification = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChangeSkills = (value: string[]) => {
  console.log(`selected ${value}`);
};

const OptionalForm: React.FC = () => {
  return (
    // <Container className="m-0">
    <Form className={`${classes.optianalForm} p-3 mb-4`}>
      <Row>
        <Col md={4} className="mt-3">
          <Title level={5}>Language :</Title>
          <Select
            labelInValue
            defaultValue={{ value: "english", label: "English" }}
            style={{ width: "100%" }}
            onChange={handleChange}
            id="language"
            options={[
              { value: "english", label: "English" },
              {
                value: "arabic",
                label: "Arabic",
              },
              {
                value: "Frensh",
                label: "frensh",
              },
            ]}
          />
        </Col>
        <Col md={4} className="mt-3">
          <div className="selectDate">
            <Title level={5}>Date :</Title>
            <DatePicker className={classes.datePicker} onChange={onChange} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mt-3">
          <Title level={5}>Skills :</Title>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            // defaultValue={["a10", "c12"]}
            onChange={handleChangeSkills}
            options={options}
          />
        </Col>
        <Col md={{ span: 4 }} className="mt-3">
          <div className="selectDate">
            <Title level={5}>Education :</Title>
            <Form.Group as={Col} controlId="formGridCity">
              {/* <Form.Label>Education :</Form.Label> */}
              <Form.Control />
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4} className={`${classes.notification} my-3`}>
          <Title className="mb-0" level={5}>
            Notification :
          </Title>
          <Switch defaultChecked onChange={onChangeNotification} />
        </Col>

        <Col md={{ span: 4, offset: 4 }} className="">
          <div className={`${classes.submitBtn} m-0 p-0`}>
            <button className="btn  " type="submit">
              Save Changes
            </button>
          </div>
        </Col>
      </Row>
    </Form>
    // {/* </Container> */}
  );
};

export default OptionalForm;
