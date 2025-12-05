import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  style?: React.CSSProperties;
}

const sidebarMenu = [
  { key: "home", label: "Home", path: "/" },
  { key: "business", label: "Business", path: "/business" },
  { key: "users", label: "Users", path: "/users" },
];



const Sidebar = ({ style }: SidebarProps) => {
  return (
    <div style={{ ...style, padding: "20px" }}>
      <h2 style={{ color: "white", marginBottom: "20px" }}>Dashboard</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {sidebarMenu.map((item) => (
          <li key={item.key} style={{ marginBottom: "15px" }}>
            <Link
              to={item.path}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
