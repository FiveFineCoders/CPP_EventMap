import { Form, Button } from 'react-bootstrap';

const FilterForm = () => {
	return (
		<Form>
			<Form.Group className='mb-3' controlId='filterStartTime'>
				<Form.Label> Start Time</Form.Label>
				<Form.Control type='datetime-local' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='filterEndTime'>
				<Form.Label> End Time</Form.Label>
				<Form.Control type='datetime-local' />
			</Form.Group>

			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};
export default FilterForm;
