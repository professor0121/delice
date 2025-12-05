import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getBusinessRequestedUser, activateBusinessAccount } from "../redux/slice/userSlice";

const Business = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.users);

  // Fetch business-requested users on mount
  useEffect(() => {
    dispatch(getBusinessRequestedUser());
  }, [dispatch]);

  const handleActivate = (email: string) => {
    if (confirm("Are you sure you want to activate this business account?")) {
      dispatch(activateBusinessAccount(email));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontSize: 24, marginBottom: 20 }}>Business Requests</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr >
            <th style={{ border: "1px solid #ccc", padding: 10 }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: 10 }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: 10 }}>Username</th>
            <th style={{ border: "1px solid #ccc", padding: 10 }}>Account Type</th>
            <th style={{ border: "1px solid #ccc", padding: 10 }}>Business Status</th>
            <th style={{ border: "1px solid #ccc", padding: 10 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 10 }}>
                No business requests found.
              </td>
            </tr>
          ) : (
            list.map((user) => (
              <tr key={user._id}>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>
                  {user.firstName} {user.lastName}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>{user.email}</td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>{user.userName}</td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>{user.accountType}</td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>{user.isActivatedBusinessAccount}</td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>
                  {user.isActivatedBusinessAccount === "Requested" && (
                    <button
                      style={{
                        backgroundColor: "#27ae60",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                      onClick={() => handleActivate(user.email)}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Business;
