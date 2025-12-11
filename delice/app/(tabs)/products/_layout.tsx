import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProductStackParamList } from "@/types/navigetion";
import List from "./list"
import Details from "./details"
const Stack = createNativeStackNavigator<UserProductStackParamList>();

export default function ProductsLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={List} />
      <Stack.Screen name="ProductDetails" component={Details} />
    </Stack.Navigator>
  );
}
