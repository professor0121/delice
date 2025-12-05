import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllUsers, deleteUser } from "../redux/slice/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page] = useState(1);
  const [limit] = useState(20);

  useEffect(() => {
    dispatch(
      fetchAllUsers({
        search,
        type,
        page,
        limit,
        sort: "latest",
      })
    );
  }, [search, type, dispatch]);

  const handleDelete = (email: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(email));
    }
  };

  // Container style – full width
  const containerStyle: React.CSSProperties = {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#fff",
  };

  const filterContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px",
    gap: "15px",
    width: "100%",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: 1,
    minWidth: "250px",
  };

  const selectStyle: React.CSSProperties = {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "180px",
  };

  const tableWrapper: React.CSSProperties = {
    overflowX: "auto",
    width: "100%",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  };

  const thStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "12px",
    textAlign: "left",
  };

  const tdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "12px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const statusStyle = (status: string): React.CSSProperties => ({
    padding: "4px 10px",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: 500,
    backgroundColor:
      status === "Activated"
        ? "#27ae60"
        : status === "Requested"
        ? "#f1c40f"
        : "#7f8c8d",
  });

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Users Management</h2>

      {/* Search & Filter */}
      <div style={filterContainer}>
        <input
          type="text"
          placeholder="Search by name, email, username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Types</option>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table */}
      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Account Type</th>
              <th style={thStyle}>Business Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ ...tdStyle, textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              list.map((u) => (
                <tr key={u._id}>
                  <td style={tdStyle}>
                    {u.firstName} {u.lastName}
                  </td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}>{u.userName}</td>
                  <td style={tdStyle}>{u.accountType}</td>
                  <td style={tdStyle}>
                    <span style={statusStyle(u.isActivatedBusinessAccount)}>
                      {u.isActivatedBusinessAccount}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() => handleDelete(u.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
