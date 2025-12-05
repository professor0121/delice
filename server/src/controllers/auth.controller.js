
// import { ApiError } from "../utils/apiErrors.js";

import { registerService, loginService,loginWithOtpService ,forgotPasswordService,resetPasswordService,getUserProfileService} from "../services/auth.service.js";
import { ApiError } from "../utils/apiErrors.js";

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, userName, accountType } = req.body;

        if (!firstName || !email || !password || !userName || !accountType) {
            throw new ApiError(400, "All fields are required");
        }

        const user = await registerService({
            firstName,
            lastName,
            email,
            password,
            userName,
            accountType
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.firstName + " " + user.lastName,
                email: user.email,
                userName: user.userName,
                accountType: user.accountType,
            },
        });
    } catch (err) {
        next(err);
    }
};


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Login Request Body:", req.body);
        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const { userEmail, message } = await loginService(email, password);
        console.log("Login Service Response:", { userEmail, message });
        res.status(200).json({
            success: true,
            message,
            email: userEmail
        });
    } catch (err) {
        next(err);
    }
};


export const loginWithOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            throw new ApiError(400, "Email and OTP are required");
        }
        console.log("Verifying OTP for email:", email);
        const { user, token } = await loginWithOtpService(email, otp);
        res.status(200).json({
            success: true,
            message: "Login with OTP successful",
            user,
            token
        }); 
    } catch (err) {
        next(err);
    }
};


export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new ApiError(400, "Email is required");
        }

        const { message,userEmail } = await forgotPasswordService(email);

        res.status(200).json({
            success: true,
            message,
            email:userEmail
        });
    } catch (err) {
        next(err);
    }
};

export const forgotPasswordWithOtp = async (req, res, next) => {
    try {
        const { email, otp} = req.body;
        if (!email || !otp) {
            throw new ApiError(400, "Email and OTP are required");
        }
        console.log("Verifying OTP for password reset for email:", email);

        const { user, token } = await loginWithOtpService(email, otp);

        res.status(200).json({
            success: true,
            message: "OTP verified successfully for password reset",
            user,
            token
        });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            throw new ApiError(400, "Email and new password are required");
        }
        const {message} = await resetPasswordService(email, newPassword);

        res.status(200).json({
            success: true,
            message,
        });
    } catch (err) {
        next(err);
    }
};

export const userProfile = async (req, res, next) => {
  try {
    const email = req.user?.email; // set by auth middleware

    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {user,token} = await getUserProfileService(email);

    return res.status(200).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error("User Profile Error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};  