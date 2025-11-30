import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}
