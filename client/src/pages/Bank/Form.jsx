import React,{useState} from 'react'
import { Navbar,Footer } from '../../components'
import illustration from "../../assets/illustration-intro.png";
import { Fragment } from 'react';
import { KYCABI,KYCAddress } from '../../middleware/constants';
import { ethers } from "ethers"

const Form = () => {
  const [bankName, setBankName] = useState("");
  const [regNo, setRegNo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const kycContract = new ethers.Contract(KYCAddress, KYCABI, provider.getSigner());
    try {
        const tx = await kycContract.createBank(bankName,regNo);
        await tx.wait();
        alert("Bank Created Successfully");
    } catch (error) {
        console.error(error);
        alert("Error Creating Bank");
    }


  }
  return (
    <Fragment>
    <div className="min-h-screen">
        <Navbar />
        <section className="p-8 relative gradient-bg-services flex">
      <div className="flex-1 pt-28 ">
        <article className="text-center max-w-3xl mx-auto ">
        <form className="my-8">
      <div className="flex flex-col items-center">
        <label htmlFor="bankName" className="text-white text-lg mb-2">
          Bank Name:
        </label>
        <input
          type="text"
          id="bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col items-center mt-4">
        <label htmlFor="regNo" className="text-white text-lg mb-2">
          Registration No:
        </label>
        <input
          type="text"
          id="regNo"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
        </article>
      </div>

      <div className="flex-1">
        <img
          src={illustration}
          alt=""
          className="block mx-auto mb-10 lg:mb-20"
        />
      </div>
    </section>
        <Footer />
    </div>
  </Fragment>
  )
}

export default Form