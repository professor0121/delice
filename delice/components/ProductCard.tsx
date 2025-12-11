
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";


type RootStackParamList = {
  ProductDetails: { product: any };
};

export default function ProductCard({ product}: { product: any }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      <TouchableOpacity 
      style={styles.cardInsideLink}
      onPress={() => navigation.navigate("ProductDetails", { product })}>
      <Image
        source={{ uri: product.productImageUrl || "https://cdn-icons-png.flaticon.com/512/833/833314.png" }}
        style={styles.thumb}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <View style={styles.row}>
        </View>
      </View>
          </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#111",
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  cardInsideLink:{
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  price: { color: "#ddd", marginTop: 6 },
  row: { flexDirection: "row", gap: 18, marginTop: 10 },
  link: { color: "#4da6ff", marginRight: 20 },
});


