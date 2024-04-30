import { KYCABI,KYCAddress } from "../middleware/constants.js";
import { ethers } from "ethers"

const provider = new ethers.providers.Web3Provider(window.ethereum);

const kycContract = new ethers.Contract(KYCAddress, KYCABI, provider.getSigner());

const getRequestedBanks = async () => {
    try {
        const tx = await kycContract.getBankRequestsAllData();
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

const getNoofRegisteredBanks = async () => {
    try {
        const tx = await kycContract.getBankCount();
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

const getBankRequestCount = async () => {
    try {
        const tx = await kycContract.getBankRequestCount();
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

const getRegisteredBanks = async () => {
    try {
        const tx = await kycContract.getVerifiedBanks();
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

const acceptBankRequest = async (address) => {
    try {
        const tx = await kycContract.verifyBank(address);
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

const rejectBankRequest = async (address) => {
    try {
        const tx = await kycContract.rejectBank(address);
        console.log(tx);
        return tx;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}
export { getRequestedBanks,getNoofRegisteredBanks,getBankRequestCount,getRegisteredBanks,acceptBankRequest,rejectBankRequest }