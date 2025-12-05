import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div 
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Left Sidebar */}
      <Sidebar
        style={{
          width: "250px",
          height: "100%",
          background: "#111827", // Dark sidebar
          color: "white",
          padding: "20px",
          boxSizing: "border-box",
        }}
      />

      {/* Right Main Content Area */}
      <main
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
