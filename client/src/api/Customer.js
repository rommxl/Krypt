import { KYCABI,KYCAddress } from "../middleware/constants.js";
import { ethers } from "ethers"
import toast from "react-hot-toast";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const kycContract = new ethers.Contract(KYCAddress, KYCABI, provider.getSigner());
const getBanks = async () => {
    try {
        const banks = await kycContract.getVerifiedBanks();
        console.log(banks);
        return banks;
        
    } catch (error) {
        toast.error("Error fetching banks");
       
        
    }

};

const createCustomer = async (name,email,password,data,bankAddress,balance) => {
    try {
        const tx = await kycContract.createCustomer(name,email,password,data,bankAddress,balance);
        await tx.wait();
        console.log("Customer created successfully");
        toast.success("Customer created successfully");
        localStorage.setItem("customer",provider.getSigner().getAddress());
        window.location.href = "/user";
        
    } catch (error) {
        toast.error("Error creating customer");
        
    }
};

const getCustDetails = async () => {
    try {
        const details = await kycContract.getCustomer(provider.getSigner().getAddress());
        console.log(details);
        const commaSeparated = details[3];
        const otherDetails = commaSeparated.split(",");
        const data = {
            name: details[0],
            email: details[1],
            aadhar: otherDetails[0],
            pan: otherDetails[1],
            age: otherDetails[2],
            gender: otherDetails[3],
            pincode: otherDetails[4],
            city: otherDetails[5],
            state: otherDetails[6],
            creditScore: otherDetails[7],
            imageuri : otherDetails[8],
            bank: details[4],
            balance: details[5]

        }
        localStorage.setItem("customer",JSON.stringify(data));
        return details;
        
    } catch (error) {
        toast.error("Error fetching customer details");
        
    }
};

const acceptCustomer = async (customerAddress) => {
    try {
        const tx = await kycContract.verifyCustomer(customerAddress);
        await tx.wait();
        toast.success("Customer accepted successfully");
        return true;
        
    } catch (error) {
        toast.error("Error accepting customer");
        return false;
        
    }
};

const rejectCustomer = async (customerAddress) => {
    try {
        const tx = await kycContract.rejectCustomer(customerAddress);
        await tx.wait();
        toast.success("Customer rejected successfully");
        return true;
        
    } catch (error) {
        toast.error("Error rejecting customer");
        return false;
        
    }
};

export {
    getBanks,
    createCustomer,
    getCustDetails,
    acceptCustomer,
    rejectCustomer
}