import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser, verifyOtp } from "../redux/slice/userAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { step, loading, error } = useAppSelector((state) => state.auth);
  const user=useAppSelector((state)=>state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    dispatch(verifyOtp({ email, otp }));
    if(user?.accountType!="Admin"){
        localStorage.removeItem("authToken");
        return navigate("/login")
    }
    navigate("/home"); // redirect after OTP
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // full height of viewport
        width:"100vw",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border:"1px solid white"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {step === "login" ? "Login" : "Verify OTP"}
        </h2>

        {/* LOGIN FORM */}
        {step === "login" && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "12px" }}>
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                background: "#111827",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {loading ? "Please wait…" : "Login"}
            </button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          </form>
        )}

        {/* OTP FORM */}
        {step === "otp" && (
          <form onSubmit={handleOtpVerify}>
            <div style={{ marginBottom: "12px" }}>
              <label>Enter 6-digit OTP</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                  fontSize: "22px",
                  letterSpacing: "5px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                background: "#111827",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {loading ? "Verifying…" : "Verify OTP"}
            </button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
