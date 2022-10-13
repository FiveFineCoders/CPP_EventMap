import { Form, Button } from "react-bootstrap";
import "../styles/sidebar.css";

const EventForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="eventName">
        <Form.Label> Event Name </Form.Label>
        <Form.Control placeholder="Ex: Halloween Party" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventStartTime">
        <Form.Label> Start Time </Form.Label>
        <Form.Control placeholder="Ex: 2022-10-31 14:00" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventEndTime">
        <Form.Label> End Time </Form.Label>
        <Form.Control placeholder="Ex: 2022-10-31 14:00" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventRoom">
        <Form.Label> Room </Form.Label>
        <Form.Control placeholder="Ex: 345" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventBuilding">
        <Form.Label> Building </Form.Label>
        <Form.Control placeholder="Ex: 8" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventDescription">
        <Form.Label> Description </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Ex: Dress up and have fun"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EventForm;
