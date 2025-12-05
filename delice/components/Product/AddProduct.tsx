import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import api from "../../redux/api/axiosInstance";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "@/redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/icon-symbol";

export default function AddProduct({ navigation }: any) {
  const user = useAppSelector((s) => s.auth.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!res.canceled)
      setImageUri(res.assets ? res.assets[0].uri : (res as any).uri);
  };

  const handleAdd = async () => {
    if (!title || !price) return alert("Title and price are required");
    setLoading(true);
    try {
      // If you have an image upload endpoint / cloudinary, upload first and get URL
      let productImageUrl = imageUri || undefined;

      const payload: any = {
        title,
        description,
        price: Number(price),
        stockQuantity: Number(stockQuantity) || 0,
        productImageUrl: productImageUrl,
        addedBy: user?._id,
      };

      await api.post("/products", payload);
      alert("Product added");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
    setLoading(false);
  };

  const handleBack=()=>{
    navigation.goBack();
  }

  return (
    <SafeAreaView 
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View
        style={{display:"flex", flexDirection:"row"}}
        >
            <TouchableOpacity
            onPress={handleBack}
            >
                <IconSymbol name="chevron.left" size={28} color="#555" />
            </TouchableOpacity>
        <Text style={styles.header}>Add Product</Text>
        </View>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
          multiline
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChangeText={setStockQuantity}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity onPress={pickImage} style={styles.btnOutline}>
          <Text style={{ color: "#fff" }}>Pick Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAdd}
          style={styles.btnPrimary}
          disabled={loading}
        >
          <Text style={{ color: "#fff" }}>
            {loading ? "Adding..." : "Add Product"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "500", color: "#555", marginBottom: 16 },
  input: {
    // backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
