import express from 'express';
import { loginUser,registerUser,loginWithOtp,forgotPassword,forgotPasswordWithOtp,resetPassword} from '../controllers/auth.controller.js';
const router = express.Router();


// router.post('/send-otp',sendOtp);
// router.post('/verify-otp',verifyEmailOtp); 


router.post('/login',loginUser);
// router.post('/user-profile',userProfile);
router.post('/verify-login-otp',loginWithOtp);
router.post('/register',registerUser);


router.post('/forgot-password',forgotPassword);
router.post('/verify-forgot-password-otp',forgotPasswordWithOtp);
router.post('/reset-password',resetPassword);


export default router;