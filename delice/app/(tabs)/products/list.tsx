import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/redux/slice/product.slice";
import ProductCard from "@/components/ProductCard";
import { UserProductStackParamList } from "@/types/navigetion";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
type Nav = NativeStackNavigationProp<UserProductStackParamList, "ProductList">;
export default function ProductList() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { products, listLoading } = useAppSelector((s: any) => s.product);
  const user = useAppSelector((s: any) => s.auth.user) as any;

  useEffect(() => {
    if (user?._id) {
      dispatch(getProducts());
    }
  }, [user?._id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: "#555", fontSize: 22, fontWeight: "500", marginBottom: 12 }}>
          Explore Products
        </Text>

        <FlatList
          data={products}
          keyExtractor={(i) => i._id}
          refreshing={listLoading}
          onRefresh={() => dispatch(getProducts())}
          renderItem={({ item }) => (
            // list.tsx
            <TouchableOpacity
              onPress={() => router.push({ pathname: "ProductDetails" as any, params: { product: item } })}
            >
              <ProductCard product={item} />
            </TouchableOpacity>

          )}
          ListEmptyComponent={() => (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <Text style={{ color: "#aaa" }}>No products yet</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
