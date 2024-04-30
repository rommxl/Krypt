import React from 'react'
import { Navbar,Footer } from '../../components'
import { useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BankLogin } from '../../api/Bank';


const Login_Bank = () => {


    useEffect(() => {
      // connect to metamask wallet give user option to connect
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' });
      }
  
    }, []);


    
  return (
    <>
         <div className="min-h-screen">
        <Navbar />
        <main className="p-8 relative gradient-bg-services ">
        <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">

        <button
              type="button"
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={
                async () => {
                  const res = await BankLogin();
                  if(res){
                    window.location.href = "/bankdash";
                  }
                }
              }
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Bank Login
              </p>
            </button>
      
      </div>
      </div>
      </div>
            
        </main>
        <Footer />
         </div>
    </>
  )
}

export default Login_Bank