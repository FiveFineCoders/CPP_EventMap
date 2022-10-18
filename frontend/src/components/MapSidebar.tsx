import { FaFilter, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Sidebar, Menu, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import FilterForm from './FilterForm';
import EventForm from './EventForm';
import { Container } from 'react-bootstrap';
import '../styles/sidebar.css';

const MapSidebar = () => {
	const [showSidebar, setShowSideBar] = useState(false);
	const handleSideBar = () => {
		setShowSideBar(!showSidebar);
	};

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<Sidebar className='sidebar' defaultCollapsed={!showSidebar} collapsedWidth='0' width='415px'>
				<Menu>
					<SubMenu className='sub-menu' label='Filter' icon={<FaFilter />} defaultOpen={false}>
						<Container id='main-container' className='d-grid h-100'>
							<FilterForm />
						</Container>
					</SubMenu>

					<SubMenu label='Create Event' icon={<AiFillPlusCircle size='30' />}>
						<Container id='main-container' className='d-grid h-100'>
							<EventForm />
						</Container>
					</SubMenu>
				</Menu>
			</Sidebar>
			<main>
				{!showSidebar && <FaArrowRight className='sidebarIcon' onClick={handleSideBar} />}
				{showSidebar && <FaArrowLeft className='sidebarIcon' onClick={handleSideBar} />}
			</main>
		</div>
	);
};

export default MapSidebar;
