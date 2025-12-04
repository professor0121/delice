import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AuthForm from "@/components/AuthForm";
import OtpInput from "@/components/OtpInput";
import { loginUser, verifyOtp } from "@/redux/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { router } from "expo-router";
import Loader from "@/components/Loader";

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { otpSent, loading, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = (data: { email: string; password: string }) => {
    setEmail(data.email);
    dispatch(loginUser(data));
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOtp({ email, otp }));
  };

  // 👀 Watch for user update to redirect properly
  useEffect(() => {
    if (!user) return;

    if (user.accountType === "Business") {
      router.replace("/(business)/home");
    } else {
      router.replace("/(tabs)");
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
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

        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>

      {loading && (
        <View style={styles.loaderBox}>
          <Loader />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loaderBox: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "black", paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" },
});
