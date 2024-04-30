import { KYCABI,KYCAddress } from "../middleware/constants.js";
import { ethers } from "ethers"
import toast from "react-hot-toast";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const kycContract = new ethers.Contract(KYCAddress, KYCABI, provider.getSigner());

const verify = async (password) => {
    try {
        const isPass = await kycContract.comparePassword(password);
        const isAdmin = await kycContract.compareAdminAddress(provider.getSigner().getAddress());
    
        console.log(isPass,isAdmin);

        if(isPass && isAdmin){
            return true;
        }
        else{
            if (!isPass) {
                toast.error("Password is incorrect");
            }
            if (!isAdmin) {
                toast.error("You are not an admin");
            }
            return false;
        }
    
    } catch (error) {
        console.error(error);
        
    }

}

export { verify };