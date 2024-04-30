import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function AdminTableNavbar(props) {
    
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setTableData(value===0?props.pending:props.registered)
    props.setIsVerified(value===0?false:true)
    
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Registered" />
        <Tab label="Pending" />
      </Tabs>
    </Box>
  );
}