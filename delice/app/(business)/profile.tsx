import { View, Text } from "react-native";
import { useAppSelector } from "@/redux/hooks";

export default function BusinessHome() {
  const user=useAppSelector((state)=>state.auth.user)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Business Home Screen {user?.email}
      </Text>
    </View>
  );
}
