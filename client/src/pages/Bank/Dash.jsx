// Dash.js
import React, { useState,useEffect } from 'react';
import { Navbar, Footer } from '../../components';
import { Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import './glassmorphicStyle.css';
import { getKyCRequests } from '../../api/Bank';
import { acceptCustomer,rejectCustomer } from '../../api/Customer';
import BalanceModal from './BalanceModal';
import axios from 'axios';
import toast from 'react-hot-toast';


const Dash = () => {
    const [showRequests, setShowRequests] = useState(true);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleViewClick = (userData) => {
      setSelectedUserData(userData);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleAcceptRequest = async() => {
      try {
        const response = await acceptCustomer(selectedUserData[0]);
        console.log(response);
        
      } catch (error) {
        console.error(error);
        
      }
      
      handleCloseModal();
    };
  
    const handleRejectRequest = async() => {
      try {
        const response = await rejectCustomer(selectedUserData[0]);
        toast.success("Customer rejected successfully");
        
      } catch (error) {
        toast.error("Error rejecting customer");

        
      }
      handleCloseModal();
    };

    const [custData, setData] = useState([]);
    const [buttonName, setButtonName] = useState('Verify PAN');
    const [btn_class, setBtnClass] = useState('btn btn-primary');

    useEffect(() => {
        const fetchData = async () => {
          const data = await getKyCRequests();
          setData(data);
        };
        fetchData();

    }, []);

    const pendingRequests = custData.filter((customer) => customer.isVerified === 'false');
    const verifiedRequests = custData.filter((customer) => customer.isVerified === 'true');

    console.log(pendingRequests);

    const getUserAadhaar = (user) => {
      const aadhaar = user.customerData.split(',')[0];
      return aadhaar;
    };

    const getPanNumber = (user) => {
      const pan = user.customerData.split(',')[1];
      return pan;
    };

    const getAge = (user) => {
      const age = user.customerData.split(',')[2];
      return age;
    }

    const getGender = (user) => {
      const gender = user.customerData.split(',')[3];
      return gender;
    }

    const getPincode = (user) => {
      const pincode = user.customerData.split(',')[4];
      return pincode;
    }

    const getAddress = (user) => {
      const address = `${user.customerData.split(',')[5]}, ${user.customerData.split(',')[6]}`
      return address;
    }

    

    const getEmail = (user) => {
      const email = user.customerEmail;
      return email;
    }

    const verifyPan = async (user) => {
      const pan = getPanNumber(user);

      console.log(pan);

      const options = {
        method: 'POST',
        url: 'https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '6a6f7b1dd8msh69cbfd46add8f4bp1b47e2jsnca59faac468d',
          'X-RapidAPI-Host': 'pan-card-verification1.p.rapidapi.com'
        },
        data: {
          task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
          group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
          data: {
            id_number: `${pan}`,
          }
        }
      };
      
      try {
        const response = await axios.request(options);
        setBtnClass('btn btn-success');
        setButtonName('Verified');
        console.log(response.data);

      } catch (error) {
        setBtnClass('btn btn-danger');
        setButtonName('Verification Failed');
        console.error(error);
      }

    };


  const[modalOpen,setModalOpen] = useState(false);


  return (
    <Fragment>
      <div className="min-h-screen">
        <Navbar />
        <main className="p-8 relative gradient-bg-services ">
          <section className="flex mb-8 ">
            {/* KYC Requests Card */}
            <div className={`white-glassmorphism p-6 flex-1 mr-4`}>
              <h2 className="text-xl font-bold mb-4 text-white">KYC Requests</h2>
              <p className="text-white mb-2">Number of KYC Requests: {pendingRequests.length}</p>
              {/* Add more details or data as needed */}
            </div>

            {/* Registered Users Card */}
            <div className={`eth-card p-6 flex-1 ml-4`}>
              <h2 className="text-xl font-bold mb-4 text-white">Registered Users</h2>
              <p className="text-white mb-2">Number of Registered Users: {verifiedRequests.length}</p>
              {/* Add more details or data as needed */}
            </div>
          </section>

          {/* Table Section */}
          <section className={`white-glassmorphism p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Data Table</h2>
              {/* Material-UI Switch */}
              <FormControlLabel
               className='text-white'
                control={
                  <Switch
                    checked={showRequests}
                    onChange={() => setShowRequests(!showRequests)}
                  />
                }
                label={showRequests ? 'View KYC Requests' : 'View Registered Users'}
                labelPlacement="start"
              />
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-500">
                  <th className="py-2 px-4 border text-white">User ID</th>
                  <th className="py-2 px-4 border text-white">Name</th>
                  <th className="py-2 px-4 border text-white">Actions</th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {/* map pending requests */}
                {showRequests &&
                  pendingRequests.map((user) => (
                    <tr key={user[0]}>
                      <td className="py-2 px-4 border text-white">{user[0]}</td>
                      <td className="py-2 px-4 border text-white">{user.customerName}</td>
                      <td className="py-2 px-4 border">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewClick(user)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}

                {/* map verified requests */}
                {!showRequests &&
                  verifiedRequests.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border text-white">{user[0]}</td>
                      <td className="py-2 px-4 border text-white">{user.customerName}</td>
                      <td className="py-2 px-4 border">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewClick(user)}
                        >
                          View
                        </Button>
                        {/* // Add balance button */}
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: '10px' }}
                          onClick={() => setModalOpen(true)}
                        >
                          ADD BALANCE
                        </Button>
                        <BalanceModal open={modalOpen} handleClose={()=>setModalOpen(false)} address={user[0]}/>

                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>

          <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle className="modal-title">User Data</DialogTitle>
          <DialogContent className="modal-content">
            {selectedUserData && (
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="modal-label">User ID:</TableCell>
                      <TableCell>{selectedUserData[0]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="modal-label">Name:</TableCell>
                      <TableCell>{selectedUserData.customerName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="modal-label">Email:</TableCell>
                      <TableCell>{getEmail(selectedUserData)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="modal-label">Aadhar Number</TableCell>
                      <TableCell>{getUserAadhaar(selectedUserData)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="modal-label">PAN Number</TableCell>
                      <TableCell>{getPanNumber(selectedUserData)}</TableCell>
                      <TableCell>
                        <button
                          className= {`${btn_class}`}
                          onClick={() => verifyPan(selectedUserData)}
                        >
                          {buttonName}
                        </button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="modal-label">Age</TableCell>
                      <TableCell>{getAge(selectedUserData)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className = "modal-label" >Gender</TableCell>
                      <TableCell>{getGender(selectedUserData)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className = "modal-label" >Pincode</TableCell>
                      <TableCell>{getPincode(selectedUserData)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className = "modal-label" >Address</TableCell>
                      <TableCell>{getAddress(selectedUserData)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions className="modal-actions">
            {showRequests && (
              <div>
                <Button onClick={handleRejectRequest} color="secondary">
                  Reject
                </Button>
                <Button onClick={handleAcceptRequest} color="primary"
                 
                >
                  Accept
                </Button>
              </div>
            )}
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
};

export default Dash;
