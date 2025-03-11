"use client";

import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";

const Dashboard = () => {
  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="w-[85%] h-screen">
        <Navbar />
        <div className="">Dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
