import React from 'react';

const CustomerCard = ({ totalCustomers }) => (
  <div className="w-[100] white-glassmorphism px-1 rounded-md overflow-hidden shadow-md">
    <div className="p-6">
      <h6 className="text-lg font-semibold text-white mb-2">Total Bank Registered</h6>
      <h4 className="text-4xl text-primary">{totalCustomers}</h4>
    </div>
  </div>
);

const PendingRequestsCard = ({ pendingRequests }) => (
  <div className="white-glassmorphism  px-4 rounded-md overflow-hidden shadow-md">
    <div className="p-6  w-[100]">
      <h6 className="text-lg font-semibold text-white mb-2">Pending Requests</h6>
      <h4 className="text-4xl text-warning">{pendingRequests}</h4>
    </div>
  </div>
);


const Dashboard = ({ totalCustoms, pendingReq }) => {
  const totalCustomers = totalCustoms; // Replace with actual data
  const pendingRequests = pendingReq; // Replace with actual data

  return (
    <div className="flex gap-8 justify-center">
      <CustomerCard totalCustomers={totalCustomers} />
      <PendingRequestsCard pendingRequests={pendingRequests} />
    </div>
  );
};

export default Dashboard;
