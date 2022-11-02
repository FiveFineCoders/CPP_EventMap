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

			<Form.Group className='mb-3' controlId='filterRoom'>
				<Form.Label> Room </Form.Label>
				<Form.Control placeholder='Ex: 345' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='filterBuilding'>
				<Form.Label> Building </Form.Label>
				<Form.Control placeholder='Ex: 8' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='filterEventType'>
				<Form.Label> Event Type </Form.Label>
				<Form.Control placeholder='Ex: Workshop' />
			</Form.Group>

			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};
export default FilterForm;
