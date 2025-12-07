
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import api from "../../redux/api/axiosInstance";
import { useAppSelector } from "@/redux/hooks";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductStackParamList } from "@/types/navigetion";
import { SafeAreaView } from "react-native-safe-area-context";

type Nav = NativeStackNavigationProp<ProductStackParamList, "ProductList">;

export default function ShowProducts() {
  const user = useAppSelector((s) => s.auth.user);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<Nav>();

  const load = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await api.get(`/products/`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [user?._id]);

  return (
    <SafeAreaView style={{ flex: 1}}>
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Text style={{ color: "#555", fontSize: 22, fontWeight: "500" }}>My Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct") as any} style={styles.addBtn}>
          <Text style={{ color: "#fff" }}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => <ProductCard product={item} onDeleted={load} />}
        refreshing={loading}
        onRefresh={load}
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

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

