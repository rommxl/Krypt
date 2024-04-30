import React, { useState } from "react";
import { Box, Card, CardContent, CardActions, TextField, Typography, Button } from '@mui/material';
import { verify } from "../api/Login";


export default function Login() {

  const boxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      minWidth: "20vw",
      height: "40vh",
    },
  }

  const cardStyle = {
    backgroundImage: '../assets/back.png', // Replace with the actual path to your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(5px)',
  }

  const [pass, setPass] = useState("default");

  const handleChange = (event) => setPass(event.target.value);

  console.log(pass)

  const onSubmit = async () => {
    const isVerified = await verify(pass);
    if (isVerified) {
      window.location.href = "/admin";
    }
 

  }

  return (
    <div className="centerflex coverfullscreen eth-card">
      <Box sx={boxStyle}>
        <Card elevation={5} className="centerflex flex-col" sx={cardStyle}>
          <CardContent>
            <Typography variant="h3" className="centerflex">
              Krypt Admin Login
            </Typography>
          </CardContent>

          <CardContent className="centerflex">
            <TextField
              required
              label={"Admin password"} onChange={handleChange} />
          </CardContent>

          <CardActions>
            <Button size="small"
              onClick={onSubmit}
            >Submit</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}
