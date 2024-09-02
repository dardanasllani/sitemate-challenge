import { Button, Input, TextField } from '@mui/material';
import React from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const UpdateTab = () => {
  const [existingTask, setExistingTask] = React.useState({});
  const [task, setTask] = React.useState({
    id: '',
    title: '',
    description: '',
  });
  const [log, setLog] = React.useState([]);
  const handleSubmit = async () => {
    try {
      await axios.put("https://sitemate-function.netlify.app/.netlify/functions/api", {
        ...task
      }).then(res => setLog(prevState => [...prevState, res.data.receivedData]));
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <TextField
        label="ID"
        value={task.id}
        onChange={(e) => setTask(prevState => ({ ...prevState, id: e.target.value }))}
        style={{ width: '33%' }}
      />
      <TextField
        label="Title"
        value={task.title}
        onChange={(e) => setTask(prevState => ({ ...prevState, title: e.target.value }))}
        style={{ width: '33%' }}
      />
      <TextField
        label="Description"
        value={task.description}
        onChange={(e) => setTask(prevState => ({ ...prevState, description: e.target.value }))}
        style={{ width: '33%' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
        Update
      </Button>
      {log && log.map(({id, title, description}, index) => 
        <p key={index}>{id} {title} {description}</p>)
      }
    </form>
  )
}

export default UpdateTab