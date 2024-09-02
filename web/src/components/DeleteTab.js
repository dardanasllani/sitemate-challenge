import React from 'react'
import axios from 'axios';
import { TextField, Button } from '@mui/material';


const DeleteTab = () => {
  const [task, setTask] = React.useState({
    id: '',
  });
  const [log, setLog] = React.useState([]);
  const handleSubmit = async () => {
    try {
      await axios.delete("https://sitemate-function.netlify.app/.netlify/functions/api?id=1").then(res => setLog(prevState => [...prevState, res.data.receivedData]));
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
        style={{ width: '100%' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
        Delete
      </Button>
      {log && log.map(({id, title, description}, index) => 
        <p key={index}>{id} {title} {description}</p>)
      }
    </form>
  )
}

export default DeleteTab