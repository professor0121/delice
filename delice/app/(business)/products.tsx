import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductStackParamList } from "@/types/navigetion";

import ShowProducts from "@/components/Product/ShowProducts";
import AddProduct from "@/components/Product/AddProduct";
import EditProduct from "@/components/Product/EditProduct";
import ProductDetails from "@/components/Product/ProductDetails";

const Stack = createNativeStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ShowProducts} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
