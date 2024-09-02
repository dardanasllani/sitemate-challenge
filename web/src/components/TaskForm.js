import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CreateTab from './CreateTab';
import UpdateTab from './UpdateTab';
import DeleteTab from './DeleteTab';
import ReadTab from './ReadTab';

const tabs = [
	{
		title: "Create",
		Component: CreateTab
	},
	{
		title: "Update",
		Component: UpdateTab
	},
	{
		title: "Delete",
		Component: DeleteTab
	},
	{
		title: "Read",
		Component: ReadTab
	}
]

function TaskForm() {
	const [tab, setTab] = useState(tabs[0]);

  return (
		<Box>
			<Tabs>
				{tabs.map((_tab) => (
					<Tab label={_tab.title} onClick={() => setTab(_tab)} style={tab.title === _tab.title ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}/>
				))}
			</Tabs>
			{tab && <tab.Component />}
		</Box>
	);
}

export default TaskForm;