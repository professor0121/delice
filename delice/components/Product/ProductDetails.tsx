import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails({ route, navigation }: any) {
  const { product } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
        >
          <IconSymbol size={28} name="chevron.left" color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 4, fontSize: 16 }}>Product Details</Text>
        </TouchableOpacity>

        {/* Product Image */}
        <Image
          source={{
            uri: product.productImageUrl || 
              "https://cdn-icons-png.flaticon.com/512/833/833314.png",
          }}
          style={styles.image}
        />
        {/* Image Gallery */}
        {product.productImageGalleryUrls?.length > 0 && (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              {product.productImageGalleryUrls.map((img: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          </>
        )}
        {/* Product Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Price */}
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>{product.description || "No description provided."}</Text>

        {/* Stock */}
        <Text style={styles.sectionTitle}>Stock</Text>
        <Text style={styles.text}>{product.stockQuantity}</Text>

        {/* Discount */}
        <Text style={styles.sectionTitle}>Discount</Text>
        <Text style={styles.text}>{product.discountPercentage || 0}%</Text>

        {/* Added By */}
        <Text style={styles.sectionTitle}>Added By</Text>
        <Text style={styles.text}>{product.addedBy?.email || product.addedBy}</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },
   galleryImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#222",
  },
  price: {
    color: "#36c",
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#aaa",
    marginTop: 14,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  text: {
    color: "#eee",
    fontSize: 15,
    lineHeight: 20,
  },
});
