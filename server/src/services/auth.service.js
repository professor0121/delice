import { findUserByEmail, findUserByUsername, createUser,updateUserPassword } from "../dao/user.dao.js";
import { ApiError } from "../utils/apiErrors.js";
import { comparePassword, hashPassword } from "../utils/hashPasswd.js";
import { sendOTP,verifyOTP } from "../utils/redisOtp.js";
import { generateToken } from "../utils/genrateToken.js";

export const registerService = async (data) => {
  const { firstName, lastName, email, password, userName, accountType } = data;
 
  const existingEmail = await findUserByEmail(email);
  if (existingEmail) throw new ApiError(409, "Email already exists");

  const existingUsername = await findUserByUsername(userName);
  if (existingUsername) throw new ApiError(409, "Username already taken");

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    userName,
    accountType
  });

  return user;
};


export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid password");

  await sendOTP(email);
console.log("OTP sent to email:", email);
  return { 
    message: "OTP sent to email for verification",
    userEmail: email
   };
};

export const loginWithOtpService = async (email, otp) => {
    const user = await findUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");
    // Verify OTP
    const isOtpValid = await verifyOTP(email, otp);
    if (!isOtpValid) throw new ApiError(401, "Invalid OTP");

    const token= generateToken({ id: user._id, email: user.email });
    return { user, token };
  };

export const forgotPasswordService= async(email)=>{
    const user = await findUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");
    await sendOTP(email);
    return {
        message: "OTP sent to email for password reset",
        userEmail: email
    };
}

export const resetPasswordService= async(email,newPassword)=>{
    const user = await findUserByEmail(email);
    if (!user) throw new ApiError(404, "User not found");
    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(email, hashedPassword);
    return { message: "Password reset successful" };
};

export const getUserProfileService = async (email)=> {
  const user = await userDao.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
    const token= generateToken({ id: user._id, email: user.email });
  return {user,token};
};