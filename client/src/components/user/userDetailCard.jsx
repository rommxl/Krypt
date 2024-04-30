import React from "react";
import UserCard from "./UserDetail"; // Adjust the import path accordingly

const UserDetailCard = () => {
  return (
    <div className="flex justify-center pt-12">
      <UserCard
        userName="John Doe"
        bankName="Sample Bank"
        bankBranch="Main Branch"
        walletAddress="0x1a2b3c4d5e6f7g8h9i0j"
        image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" // Provide the actual image URL or path
      />
    </div>
  );
};

export default UserDetailCard;
