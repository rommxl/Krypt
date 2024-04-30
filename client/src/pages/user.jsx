import React, { useState } from "react";
import { UserTable, UserModal} from "../components";
import { Navbar, Footer } from "../components";
import { Button } from "@mui/material";
import DetailCard from "../components/user/UserDetailCard";
import AreaCards from "../components/user/UerCard";


export default function User() {


  // Modal open and close state handling
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Navbar />
      <div className=" centerflex flex-col gradient-bg-transactions">
        <h1 className="text-4xl text-white pt-4 font-bold">User Dashboard</h1>
        <div
          id="usercards"
          className="grid grid-cols-1 md:grid-cols-2"
        >
          <div>
            <AreaCards />
          </div>
          <div>
            <DetailCard />
          </div>
        </div>
        <div id="usertable" className=" pt-24 ">
          <Button variant="text" onClick={handleOpen}>
            Add transaction
          </Button>
          </div>
          <UserModal open={open} handleClose={handleClose} />
          <div>
          <UserTable transactions={JSON.parse(localStorage.getItem("transactions")) || []} />
        </div>
      </div>
      <Footer />
    </>
  );
}

