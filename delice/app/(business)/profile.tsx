import { View, Text } from "react-native";
import { LogOut } from "@/components/LogOut";

export default function BusinessHome() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Business Home Screen
      </Text>
    </View>
  );
}
