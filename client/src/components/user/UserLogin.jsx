import React from 'react'
import {Navbar,Footer} from "../../components"
import { AiFillPlayCircle } from "react-icons/ai";
import { getCustDetails } from '../../api/Customer'; 

const UserLogin = () => {
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
                const res = await getCustDetails();
                if(res){
                    console.log(res);
                    window.location.href = "/user";
                }
            }
            }
       >
         <AiFillPlayCircle className="text-white mr-2" />
         <p className="text-white text-base font-semibold">
           Customer Login
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

export default UserLogin