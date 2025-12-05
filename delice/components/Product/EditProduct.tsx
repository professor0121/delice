import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import api from "../../redux/api/axiosInstance";


export default function EditProduct({ route, navigation }: any) {
const { product } = route.params;


const [title, setTitle] = useState(product.title || "");
const [description, setDescription] = useState(product.description || "");
const [price, setPrice] = useState(String(product.price || ""));
const [stockQuantity, setStockQuantity] = useState(String(product.stockQuantity || ""));
const [loading, setLoading] = useState(false);


const handleUpdate = async () => {
setLoading(true);
try {
await api.put(`/products/${product._id}`, {
title,
description,
price: Number(price),
stockQuantity: Number(stockQuantity) || 0,
});


alert("Updated");
navigation.goBack();
} catch (err) {
console.error(err);
alert("Failed to update");
}
setLoading(false);
};


return (
<ScrollView contentContainerStyle={{ padding: 16 }}>
<Text style={styles.header}>Edit Product</Text>


<TextInput style={styles.input} value={title} onChangeText={setTitle} />
<TextInput style={[styles.input, { height: 100 }]} value={description} onChangeText={setDescription} multiline />
<TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
<TextInput style={styles.input} value={stockQuantity} onChangeText={setStockQuantity} keyboardType="numeric" />


<TouchableOpacity onPress={handleUpdate} style={styles.btnPrimary} disabled={loading}>
<Text style={{ color: "#fff" }}>{loading ? "Saving..." : "Save"}</Text>
</TouchableOpacity>
</ScrollView>
);
}


const styles = StyleSheet.create({
header: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16 },
input: { backgroundColor: "#111", padding: 12, borderRadius: 8, color: "#fff", marginBottom: 12 },
btnPrimary: { backgroundColor: "#007AFF", padding: 14, borderRadius: 8, marginTop: 12, alignItems: "center" },
});