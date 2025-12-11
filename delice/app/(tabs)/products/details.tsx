import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserProductStackParamList } from "@/types/navigetion";
import { IconSymbol } from "@/components/ui/icon-symbol";

type Props = NativeStackScreenProps<UserProductStackParamList, "ProductDetails">;

export default function Details({ route, navigation }: Props) {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconSymbol name="chevron.left" size={28} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Main Product Image */}
        <Image
          source={{ uri: product.productImageUrl }}
          style={styles.mainImage}
        />

        {/* Gallery */}
        {product.productImageGalleryUrls?.length > 0 && (
          <FlatList
            data={product.productImageGalleryUrls}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            style={styles.galleryContainer}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
          />
        )}

        {/* Product Info */}
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.discount}>Discount: {product.discountPercentage || 0}%</Text>
        <Text style={styles.stock}>Stock: {product.stockQuantity}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description || "No description provided."}</Text>

        <Text style={styles.sectionTitle}>Added By</Text>
        <Text style={styles.addedBy}>{product.addedBy.firstName} {product.addedBy.lastName} ({product.addedBy.email})</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // dark background
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },
  mainImage: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#222",
  },
  galleryContainer: {
    marginBottom: 16,
  },
  galleryImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#222",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: "#36c",
    fontWeight: "600",
    marginBottom: 4,
  },
  discount: {
    fontSize: 14,
    color: "#0f0",
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#aaa",
    marginBottom: 4,
    marginTop: 12,
  },
  description: {
    fontSize: 15,
    color: "#eee",
    lineHeight: 22,
  },
  addedBy: {
    fontSize: 14,
    color: "#ccc",
  },
});
