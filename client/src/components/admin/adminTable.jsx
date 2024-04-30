import React, { useState } from 'react';
import { VerifyModal, ViewModal } from './AdminModals';
import { Box,Paper,TableRow,TableHead, TableContainer, TableCell, TableBody, Table, Button } from '@mui/material';


export default function AdminTable(props) {

    const[bankName,setBankName] = useState("");
    const[bankReg,setBankReg] = useState("");
    const[bankWallet,setBankWallet] = useState("");

    const[open,setOpen] = useState(false);
    const handleOpen = (e) =>{
        setBankName(e.target.value.split(',')[0]);
        setBankReg(e.target.value.split(',')[1]);
        setBankWallet(e.target.value.split(',')[2]);
        setOpen(true);  
    } 
    const handleClose = () => setOpen(false);

    return (
        <TableContainer component={Box} className='centerflex'>
            <Table sx={{ maxWidth: "50rem", minWidth:"35rem" }} aria-label="simple table" component={Paper} elevation={4}>
                <TableHead>
                    <TableRow>
                        <TableCell>Bank Rg Num</TableCell>
                        <TableCell align="right">Bank Name</TableCell>
                        <TableCell align="right">Wallet</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {props.banks.map((bank) => (
                    <TableRow
                    key={bank.bankRegNum}
                    >
                        <TableCell >
                            {bank.bankRegNum}
                        </TableCell>
                        <TableCell align="right">{bank.bankName}</TableCell>
                        <TableCell align="right">
                            <Button onClick={handleOpen} value={[bank.bankName,bank.bankRegNum,bank.bankWallet]}>
                                Click me
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            {props.isVerified?
                <ViewModal 
                    open={open} 
                    handleClose={handleClose} 
                    bankName={bankName} 
                    bankReg={bankReg}
                    bankWallet={bankWallet}
                />:
                <VerifyModal
                    open={open} 
                    handleClose={handleClose} 
                    bankName={bankName} 
                    bankReg={bankReg}
                    bankWallet={bankWallet}
                />
            }
        </TableContainer>
    );
}