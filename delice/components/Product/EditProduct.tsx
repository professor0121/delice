import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProduct } from "../../redux/slice/product.slice";
import { IconSymbol } from "../ui/icon-symbol";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProduct({ route, navigation }: any) {
  const { product } = route.params;

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.product);

  const [title, setTitle] = useState(product.title || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(String(product.price || ""));
  const [stockQuantity, setStockQuantity] = useState(String(product.stockQuantity || ""));

  const handleUpdate = () => {
    if (!title || !price) {
      alert("Title and price are required");
      return;
    }

    dispatch(
      updateProduct({
        id: product._id,
        data: {
          title,
          description,
          price: Number(price),
          stockQuantity: Number(stockQuantity),
        },
      })
    ).then((res: any) => {
      if (!res.error) {
        alert("Product Updated");
        navigation.goBack();
      } else {
        alert("Update failed");
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
        >
          <IconSymbol size={28} name="chevron.left" color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 4, fontSize: 16 }}>Edit Product</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Edit Product</Text>

        <TextInput
          placeholder="Title"
          placeholderTextColor="#666"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="#666"
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          placeholder="Price"
          placeholderTextColor="#666"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Stock Quantity"
          placeholderTextColor="#666"
          style={styles.input}
          value={stockQuantity}
          onChangeText={setStockQuantity}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleUpdate} style={styles.btnPrimary} disabled={loading}>
          <Text style={{ color: "#fff", fontSize: 16 }}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 12,
    fontSize: 15,
  },
  btnPrimary: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
});
