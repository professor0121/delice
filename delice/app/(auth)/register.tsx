import React from "react";
import { View } from "react-native";
import AuthForm from "@/components/AuthForm";
import {registerUser} from "../../redux/slice/auth.slice";
import { useAppDispatch } from "../../redux/hooks";
import { router } from "expo-router";


const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const handleRegister = (data: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    accountType?: string;
    email: string;
    password: string;
  }) => {
    console.log("Register Data:", data);
    dispatch(registerUser(data));
    alert(data);
    router.replace("/(auth)/login")
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <AuthForm mode="register" onSubmit={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
