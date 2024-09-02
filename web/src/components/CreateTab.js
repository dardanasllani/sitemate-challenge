import { Button, Input, TextField } from '@mui/material';
import React from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateTab = () => {
  const [task, setTask] = React.useState({
    title: '',
    description: '',
  });
  const [log, setLog] = React.useState([]);
  const handleSubmit = async () => {
    try {
      await axios.post("https://sitemate-function.netlify.app/.netlify/functions/api", {
        id: uuidv4(),
        ...task
      }).then(res => setLog(prevState => [...prevState, res.data.receivedData]));
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <TextField
        label="Title"
        value={task.title}
        onChange={(e) => setTask(prevState => ({ ...prevState, title: e.target.value }))}
        style={{ width: '50%' }}
      />
      <TextField
        label="Description"
        value={task.description}
        onChange={(e) => setTask(prevState => ({ ...prevState, description: e.target.value }))}
        style={{ width: '50%' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
        Create
      </Button>
      {log && log.map(({id, title, description}, index) => 
        <p key={index}>{id} {title} {description}</p>)
      }
    </form>
  )
}

export default CreateTab