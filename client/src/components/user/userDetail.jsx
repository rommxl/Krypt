import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ userName, bankName, bankBranch, walletAddress, image }) => {
  return (
    <div className=" rounded-md p-6 shadow-md white-glassmorphism">
      {image && <img src={JSON.parse(localStorage.getItem("customer")).imageuri} alt="User" className="rounded-full mx-auto mb-4 w-32 h-32" />}
      <div className="text-white">
        <div className="mb-2">
          <strong className="mr-2">User Name:</strong> {JSON.parse(localStorage.getItem("customer")).name}
        </div>
        <div className="mb-2">
          <strong className="mr-2">Bank Address:</strong> {JSON.parse(localStorage.getItem("customer")).bank}
        </div>
        <div className="mb-2">
          <strong className="mr-2">Aadhaar Number</strong> {JSON.parse(localStorage.getItem("customer")).aadhar}
        </div>
        <div>
          <strong className="mr-2">Pan Number</strong> {JSON.parse(localStorage.getItem("customer")).pan}
        </div>
        <div>
          <strong className="mr-2">Pincode</strong> {JSON.parse(localStorage.getItem("customer")).pincode}
        </div>

      </div>
    </div>
  );
};

UserCard.propTypes = {
  userName: PropTypes.string.isRequired,
  bankName: PropTypes.string.isRequired,
  bankBranch: PropTypes.string.isRequired,
  walletAddress: PropTypes.string.isRequired,
  image: PropTypes.string, // Image URL or path
};

export default UserCard;  


