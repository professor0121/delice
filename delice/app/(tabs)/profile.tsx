import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/redux/hooks";
import { LogOut } from "@/components/LogOut";

const profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <SafeAreaView>
      <View>
        <Text>Profile Screen</Text>
        <LogOut style={{ padding: 10, backgroundColor: "red" }} />
      </View>
    </SafeAreaView>
  );
};

export default profile;
