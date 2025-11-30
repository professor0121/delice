import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Onboarding1() {
  return (
    <View>
      <Text>Onboarding Screen 1</Text>
      <Button title="Next" onPress={() => router.push("/(onboarding)/onboarding2")} />
    </View>
  );
}
