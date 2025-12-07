import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReelStackParamList } from "@/types/navigetion";

import ShowReels from "@/components/Reel/ShowReels";
import EditReel from "@/components/Reel/EditReel";
import CreateReel from "@/components/Reel/CreatReel";

const Stack = createNativeStackNavigator<ReelStackParamList>();

export default function ReelStack() {
  return (
    <Stack.Navigator initialRouteName="ReelList" screenOptions={{ headerShown: false }}>

      {/* Reel List Screen */}
      <Stack.Screen name="ReelList" component={ShowReels} />

      {/* Edit Reel Screen */}
      <Stack.Screen name="EditReel" component={EditReel} />

      {/* Create Reel Screen */}
      <Stack.Screen name="CreateReel" component={CreateReel} />

    </Stack.Navigator>
  );
}
