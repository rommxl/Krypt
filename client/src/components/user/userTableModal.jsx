import React, { useState } from "react";
import { Button,Modal, Box, TextField} from "@mui/material";
import toast from "react-hot-toast";

function CustomTextField(props){
    

    return(
        <TextField
        required
        id="outlined-required"
        label={props.label}
        sx={{margin:"1rem"}}
        onChange={(event) => props.setter(event.target.value)}
        />
    );

}

export default function UserModal(props){

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display:"flex",
        justifyContent:"center"
      };

    const submitTransaction = async (event) =>{
        event.preventDefault();
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const newTransaction = {
            id: transactions.length+1,
            to: to,
            from: from,
            amount: amt
        }
        transactions.push(newTransaction);
        localStorage.setItem("transactions",JSON.stringify(transactions));
        toast.success("Transaction added successfully");


    }

    // [{}]

    //Handling state change in modal input fields as form control is not possible as of now in modals
    const [to, setTo] = useState("");
    const [amt, setAmt] = useState(0);
    const [from, setFrom] = useState("");

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="centerflex flex-col"
        >
            <Box sx={style}>

                <CustomTextField label={"To"} setter={setTo}/>
                <CustomTextField label={"From"} setter={setFrom}/>
                <CustomTextField label={"Amount"} setter={setAmt}/>

                <Button onClick={submitTransaction} value={[to, from, amt]}>Confirm</Button>
            </Box>
        </Modal>
    );
}