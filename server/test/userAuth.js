const registerUser = async () => {
  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "Abhi",
      lastName: "Kush",
      email: "musicsoft790@gmail.com",
      password: "123456",
      userName: "softmusic",
      accountType: "Admin"
    })
  });

  const data = await res.json();
  console.log("Response:", data);
};

registerUser();

const loginUser = async () => {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "abhishekkushwahaak0121@gmail.com",
      password: "newpassword123"
    })
  });

  console.log("STATUS:", res.status);
  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  // Try JSON
  try {
    const data = JSON.parse(text);
    console.log("JSON:", data);
  } catch (err) {
    console.log("❌ Not JSON. Error:", err.message);
  }
};

// loginUser();


// To test login with OTP, uncomment and provide the correct OTP

const loginWithOtp = async () => {
    const res = await fetch("http://localhost:3000/api/auth/verify-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "abhishekkushwahaak0121@gmail.com",
            otp: "623314" // Replace with the actual OTP received via email
        })
    });
    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("Response:", data);
};

// loginWithOtp();


const forgotPassword = async () => {
    const res = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "abhishekkushwahaak0121@gmail.com"
        })
    });
    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("Response:", data);
};

// forgotPassword();

const forgotPasswordWithOtp = async () => {
    const res = await fetch("http://localhost:3000/api/auth/verify-forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "abhishekkushwahaak0121@gmail.com",
            otp: "665760" // Replace with the actual OTP received via email
        })
    });
    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("Response:", data);
};

// forgotPasswordWithOtp(); 
const resetPassword = async () => {
    const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "abhishekkushwahaak0121@gmail.com",
            newPassword: "newpassword123"
        })
    });
    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("Response:", data);
};

// resetPassword();