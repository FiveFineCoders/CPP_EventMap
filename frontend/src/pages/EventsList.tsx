import { EventList } from '../components/EventList';
//import '../styles/general.css'
import { ProSidebarProvider } from 'react-pro-sidebar';

export const EventsList = (): JSX.Element => {
	return (
		<div>
			<ProSidebarProvider>
				<EventList />
			</ProSidebarProvider>
		</div>
	);
};
