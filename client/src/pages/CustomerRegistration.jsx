import React, { useState,useEffect } from "react";
import { Box, TextField, Button, Paper, Stack, Typography, Select, MenuItem,InputLabel } from "@mui/material";
import { getBanks,createCustomer } from "../api/Customer.js";
import postToInfura from "../api/postToInfura.js";
import {Navbar,Footer} from "../components";
import { Fragment } from 'react';

export default function CustomerRegistration(){

    const[formJson,setFormJson] = useState({});
    const [banks, setBanks] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchBanks = async () => {
            const banks = await getBanks();
            setBanks(banks);
        };
        fetchBanks();
    }, []);

    const handleImageChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSelectedImage(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
    console.log("Image Selected");
    console.log(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormJson(
            {
                name:e.target[0].value,
                email:e.target[2].value,
                password:e.target[4].value,
                file:e.target[6].files,
                aadhar:e.target[7].value,
                pan:e.target[9].value,
                age:e.target[11].value,
                gender:e.target[13].value,
                pincode:e.target[15].value,
                city:e.target[17].value,
                state:e.target[19].value,
                creditScore:e.target[21].value,
                bank: e.target[23].value,
            }
        )
        postToInfura(selectedImage).then((imageUri) => {
            console.log(imageUri);
            const data = `${formJson.aadhar},${formJson.pan},${formJson.age},${formJson.gender},${formJson.pincode},${formJson.city},${formJson.state},${formJson.creditScore},${imageUri}`;
            createCustomer(
                formJson.name,
                formJson.email,
                formJson.password,
                data,
                formJson.bank,
                "0"
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });









        // console.log(formJson)
    }

    const style = {
        minWidth: "40rem",
        minHeight: "40rem",
        padding: "2rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        // background: "#2c3e50",
        // color: "#ecf0f1",
    };

    const inputStyle = {
        color: "white",
        borderColor: "#ecf0f1",
    
    };

    const dropdownStyle = {
        color: "#ecf0f1",
        borderColor: "#ecf0f1",
        minWidth: "100%", // Make the dropdown wider
    };

    const submitButtonStyle = {
        background: "#3498db",
        color: "#ecf0f1",
        padding: "10px 20px", // Add padding to the submit button
        marginTop: "1rem", // Add space between the last field and the submit button
    };
    console.log(formJson)
    return(
      
        <Fragment>
             <div className="min-h-screen">
            <Navbar />
            <main className="p-8 relative gradient-bg-services ">
            <div className="coverfullscreen centerflex gradient-bg-services">
            <form onSubmit={handleSubmit} method="post">
                <Box sx={style} className="centerflex flex-col" component={Paper} >
                    <Typography variant={"h3"} sx={{margin:"1rem"}}>Customer sign-Up</Typography>
                    <Stack direction={"row"} className="child-margin">
                        <TextField
                        required
                        label="Full name"
                        style={{
                            color: "white",
                            borderColor: "#ecf0f1",
                            label:{
                                color:"white"
                            
                            }
                        }}
                        />

                        <TextField
                        required
                        type="email"
                        label="Email"
                        sx = {inputStyle}
                        />

                        <TextField
                        required
                        type="Password"
                        label="Password"
                        sx = {inputStyle}
                        />
                    </Stack>
                    

                    <input type="file"
                     onChange={handleImageChange}
                    />
                    
                    <Stack direction={"row"} className="child-margin">
                        <TextField
                        required
                        label="Aadhar number"
                        sx={inputStyle}
                        />

                        <TextField
                        required
                        label="Pan card number"
                        sx={inputStyle}
                        />
                    </Stack>
                        
                    <Stack direction={"row"} className="child-margin">
                        <TextField
                        required
                        type="number"
                        label="Age"
                        sx = {inputStyle}
                        />

                        <TextField
                        required
                        label="Gender"
                        sx = {inputStyle}
                        />
                    </Stack>
                    
                    <Stack direction={"row"} className="child-margin">    
                        <TextField
                        required
                        type="number"
                        label="Pincode"
                        sx = {inputStyle}
                        />

                        <TextField
                        required
                        label="City"
                        sx = {inputStyle}
                        />

                        <TextField
                        required
                        label="State"
                        sx = {inputStyle}
                        />
                    </Stack>

                    <TextField
                    required
                    label="Credit score"
                    sx = {inputStyle}
                    />
             <InputLabel htmlFor="bank" sx={{ color: "#ecf0f1", marginBottom: "0.5rem" }}>Select Bank</InputLabel>
            <Select
            required
            label="Bank"
            value={formJson.bank || ""}
            onChange={(e) => setFormJson({ ...formJson, bank: e.target.value })}
            sx={dropdownStyle}
            placeholder="Select a bank"
          >
            {banks.map((bank) => (
              <MenuItem key={bank[0]} value={bank[0]}>
                {bank.bankName}
              </MenuItem>
            ))}
            </Select>
                    <Button type="submit"
                     className="btn-primary"
                     sx={submitButtonStyle}
                    >Submit</Button>
                </Box>
            </form>
        </div>
            </main>
            <Footer />
             </div>
        </Fragment>


    )
};