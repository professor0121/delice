import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";


export default function ProductDetails({ route }: any) {
const { product } = route.params;


return (
<ScrollView contentContainerStyle={{ padding: 16 }}>
<Image source={{ uri: product.productImageUrl || "https://cdn-icons-png.flaticon.com/512/833/833314.png" }} style={styles.image} />


<Text style={styles.title}>{product.title}</Text>
<Text style={styles.price}>₹{product.price.toFixed(2)}</Text>


<Text style={styles.sectionTitle}>Description</Text>
<Text style={styles.text}>{product.description || "No description"}</Text>


<Text style={styles.sectionTitle}>Stock</Text>
<Text style={styles.text}>{product.stockQuantity}</Text>


<Text style={styles.sectionTitle}>Discount</Text>
<Text style={styles.text}>{product.discountPercentage || 0}%</Text>


<Text style={styles.sectionTitle}>Added By</Text>
<Text style={styles.text}>{product.addedBy?.email || product.addedBy}</Text>
</ScrollView>
);
}


const styles = StyleSheet.create({
image: { width: "100%", height: 260, borderRadius: 12, marginBottom: 12 },
title: { fontSize: 22, color: "#fff", fontWeight: "700" },
price: { color: "#ddd", marginVertical: 8 },
sectionTitle: { color: "#aaa", marginTop: 12, marginBottom: 6 },
text: { color: "#fff" },
});