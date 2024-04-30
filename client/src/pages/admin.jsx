import React,{useState} from "react";
// import { Navbar, Footer } from "../components";
import { AdminTable,Dashboard, AdminTableNavbar, Navbar, Footer } from "../components";
import { useEffect } from "react";
import {getRequestedBanks,getRegisteredBanks} from "../api/Admin.js"
//Expected bank data to be passed to table




export default function Admin(){

    

    const [requestedBanks,setRequestedBanks] = useState([]);
    const [registeredBanks,setRegisteredBanks] = useState([]);

    useEffect(() => {
        const fetchRequestedBanks = async () => {
            const data = await getRequestedBanks();
            console.log(data);
            setRequestedBanks(data);
        }


        const fetchRegisteredBanks = async () => {
            const data = await getRegisteredBanks();
            setRegisteredBanks(data);
        }

        fetchRequestedBanks();
        fetchRegisteredBanks();

    },[]);

    var registereds  = registeredBanks.map((bank) => {
        return {
            bankName: bank[1],
            bankRegNum: bank[2],
            bankWallet: bank[0]
        }
    })

    var pendings = requestedBanks.map((bank) => {
        return {
            bankName: bank[1],
            bankRegNum: bank[2],
            bankWallet: bank[0]
        }
    
    })

    var registered = []
    for (var i = 0; i < registereds.length; i++) {
       if (registereds[i] !== undefined && registereds[i].bankName!=='') {
           registered.push(registereds[i]);
       }
    }

    var pending = []
    for (var j = 0; j < pendings.length; j++) {
        if (pendings[j] !== undefined && pendings[j].bankName!=='') {
            pending.push(pendings[j]);
        }
    }



    const[tableData,setTableData] = useState([]);
    const[isVerified,setIsVerified] = useState(null);

    console.log(isVerified)
    console.log("Pending",pending)

    return(
        <>
        <Navbar/>
        <div className="centerflex">

        <h1 className="text-4xl text-white py-4 font-bold">Admin Dashboard</h1>
        </div>
            <Dashboard
            totalCustoms={registered[0] === undefined?0:registered.length}
            pendingReq={pending[0] === undefined?0:pending.length}
            />
            <div className="centerflex py-40 gradient-bg-services flex-col">
                <div>
                    <AdminTableNavbar 
                    setIsVerified={setIsVerified}
                    setTableData={setTableData}
                    pending={pending}
                    registered={registered}
                    />

                    <AdminTable banks={tableData} isVerified={isVerified}
                    />
                </div>
            </div>
            <Footer/>
        </>
        
    );
    
}