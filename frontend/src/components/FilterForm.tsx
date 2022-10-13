import { Form, Button } from "react-bootstrap";

const FilterForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="filterStartTime">
        <Form.Label> Start Time</Form.Label>
        <Form.Control placeholder="Ex: 2022-10-31 14:00:00" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="filterEndTime">
        <Form.Label> End Time</Form.Label>
        <Form.Control placeholder="Ex: 2022-10-31 14:00:00" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default FilterForm;
