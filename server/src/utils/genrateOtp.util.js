export default function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
// This function generates a 6-digit OTP (One Time Password) as a string.