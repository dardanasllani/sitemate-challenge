import React from 'react'
import axios from 'axios';
import { Button } from '@mui/material';

const ReadTab = () => {
  const [log, setLog] = React.useState([]);
  const handleSubmit = async () => {
    try {
      await axios.get("https://sitemate-function.netlify.app/.netlify/functions/api").then(res => setLog(res.data.issues));
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>
        Read
      </Button>
      {log && log.map(({id, title, description}, index) => 
        <p key={index}>{id} {title} {description}</p>)
      }
    </form>
  )
}

export default ReadTab