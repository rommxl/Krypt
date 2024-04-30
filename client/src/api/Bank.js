import toast from "react-hot-toast";
import { KYCABI,KYCAddress } from "../middleware/constants.js";
import { ethers } from "ethers"


const provider = new ethers.providers.Web3Provider(window.ethereum);

const kycContract = new ethers.Contract(KYCAddress, KYCABI, provider.getSigner());

const createBank = async (bankName,regNo) => {
    try {
        const tx = await kycContract.createBank(bankName,regNo);
        await tx.wait();
        return true;
        
    } catch (error) {
        console.error(error);
        return false;

        
    }
};

const BankLogin = async () => {
    try {
        const tx = await kycContract.bankLogin(provider.getSigner().getAddress());
        window.location.href = "/bankdash"
        return true;
        
    } catch (error) {
        console.error(error);
        alert("You are not a registered bank");
        return false;

        
    }
};

const getKyCRequests = async () => {
    try {
        const tx = await kycContract.getCustomersinABank(provider.getSigner().getAddress());
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;

        
    }
};

const addBalance = async (address,balance) => {
    try {
        const tx = await kycContract.updateBalace(address,balance);
        await tx.wait();
        toast.success("Balance updated");
        return true;
        
    } catch (error) {
        console.error(error);
        return false;

        
    }

}

export {createBank,BankLogin,getKyCRequests,addBalance}
