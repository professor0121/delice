
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { TextInput, FlatList, TouchableOpacity, StyleSheet, Image ,View, Text} from "react-native";
import { useRouter } from "expo-router";

export function ProductSearch() {
  const router = useRouter();
  const products = useAppSelector((state: any) => state.product.products) || [];
  const [query, setQuery] = useState("");
  
  const filteredProducts = products.filter((product: any) =>
    product.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <Text style={styles.searchTitle}>Search Products</Text>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search by product name..."
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {filteredProducts.length === 0 ? (
        <Text style={{ marginTop: 24, color: "#888", textAlign: "center" }}>
          No products found.
        </Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item: any) => item.id?.toString() || item._id?.toString()}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push({ pathname: "/(business)/products/ProductDetails" as any, params: { productId: item.id || item._id } })}
            >
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.img}
                  resizeMode="cover"
                />
              )}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDesc} numberOfLines={1}>
                  {item.description || ""}
                </Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
    color: "#222",
  },
  input: {
    backgroundColor: "#f1f3f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafbfd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#e0e0e0"
  },
  productName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222"
  },
  productDesc: {
    fontSize: 13,
    color: "#666"
  },
  productPrice: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "500",
    marginTop: 4,
  },
});

