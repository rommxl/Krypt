import React from "react";
import { Button,Modal} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { rejectBankRequest,acceptBankRequest } from "../../api/Admin";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function VerifyModal(props){

    const handleAccept = async () => {
        await acceptBankRequest(props.bankWallet);

    
    };

    const handleReject = async () => {
        await rejectBankRequest(props.bankWallet);
    }


    return(
        <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Card sx={style}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.bankName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Bank registraion number: {props.bankReg}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Bank wallet address: {props.bankWallet}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"
                    onClick={handleAccept}
                    >Accept request</Button>
                    <Button size="small"
                    onClick={handleReject}
                    >Reject request</Button>
                </CardActions>
                </Card>

        </Modal>
    );
}

function ViewModal(props){

    return(
        <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Card sx={style}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.bankName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Bank registraion number: {props.bankReg}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Bank wallet address: {props.bankWallet}
                    </Typography>
                </CardContent>
            </Card>
        </Modal>
    );
}

export {VerifyModal,ViewModal};