import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AuthForm from "@/components/AuthForm";
import OtpInput from "@/components/OtpInput";
import { loginUser, verifyOtp } from "@/redux/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { router } from "expo-router";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { otpSent, loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = (data: { email: string; password: string }) => {
    setEmail(data.email);
    dispatch(loginUser(data));
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOtp({ email, otp }));
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      {!otpSent ? (
        <AuthForm mode="login" onSubmit={handleLogin} />
      ) : (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <OtpInput length={6} onChange={setOtp} />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center"},
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "black", paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" },
});
