import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const LogOut = ({ style }: { style: any }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/(auth)/login");
  };

  return (
    <TouchableOpacity style={style} onPress={handleLogout}>
      <Text style={{ color: "white" }}>Log Out</Text>
    </TouchableOpacity>
  );
};
