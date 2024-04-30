import { KYCABI,KYCAddress } from "../middleware/constants.js";
import { ethers } from "ethers"

const provider = new ethers.providers.Web3Provider(window.ethereum);

const kycContract = new ethers.Contract(KYCAddress, KYCABI, provider.getSigner());

const addTransaction = async (to,amount) => {
    try {
        const formattedAddress = ethers.utils.getAddress(to);
        const tx = await kycContract.createTransaction(formattedAddress,amount,"test");
        await tx.wait();
        return true;
        
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

export { addTransaction };