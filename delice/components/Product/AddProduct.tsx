import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  uploadImage,
  uploadImages,
  resetUploads,
} from "../../redux/slice/upload.slice";
import {
  createProduct,
  resetProductState,
} from "../../redux/slice/product.slice";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/icon-symbol";

export default function AddProduct({ navigation }: any) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const upload = useAppSelector((s) => s.upload);
  const productState = useAppSelector((s) => s.product);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  // ------------------------------------------
  // PICK SINGLE IMAGE
  // ------------------------------------------
  // const pickSingleImage = async () => {
  //   const res = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 0.8,
  //   });

  //   if (!res.canceled) {
  //     const fileUri = res.assets[0].uri;
  //     const file: any = {
  //       uri: fileUri,
  //       type: "image/jpeg",
  //       name: "product-single.jpg",
  //     };

  //     dispatch(uploadImage(file));
  //   }
  // };
  const pickSingleImage = async () => {
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
  });

  if (!res.canceled) {
    const fileUri = res.assets[0].uri;
    const file: any = {
      uri: fileUri,
      type: "image/jpeg",
      name: "product-single.jpg",
    };

    dispatch(uploadImage(file));
  }
};


  // ------------------------------------------
  // PICK MULTIPLE IMAGES (GALLERY)
  // ------------------------------------------
  // const pickGalleryImages = async () => {
  //   const res = await ImagePicker.launchImageLibraryAsync({
  //     allowsMultipleSelection: true,
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     quality: 0.7,
  //   });

  //   if (!res.canceled) {
  //     const files: any[] = res.assets.map((a, index) => ({
  //       uri: a.uri,
  //       type: "image/jpeg",
  //       name: "gallery-" + index + ".jpg",
  //     }));

  //     dispatch(uploadImages(files));
  //   }
  // };
  const pickGalleryImages = async () => {
  const res = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (!res.canceled) {
    const assets = Array.isArray(res.assets) ? res.assets : [res.assets[0]];
    const files: any[] = assets.map((a, index) => ({
      uri: a.uri,
      type: "image/jpeg",
      name: "gallery-" + index + ".jpg",
    }));

    dispatch(uploadImages(files));
  }
};


  // ------------------------------------------
  // CREATE PRODUCT
  // ------------------------------------------
  const handleCreate = () => {
    if (!title || !price || !upload.image || !user?._id)
      return alert("Title, Price, Main Image & User ID required.");

    const payload = {
      title,
      description,
      price: Number(price),
      productImageUrl: upload.image, // single image
      productImageGalleryUrls: upload.images, // gallery images
      addedBy: user._id,
      discountPercentage: Number(discountPercentage) || 0,
      stockQuantity: Number(stockQuantity) || 0,
    };

    dispatch(createProduct(payload)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        alert("Product created ❤️");
        dispatch(resetUploads());
        dispatch(resetProductState());
        navigation.goBack();
      }
    });
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>
        {/* <IconSymbol  */}
        <TouchableOpacity 
        onPress={()=>navigation.goBack()}
        style={{ display: "flex", flexDirection: "row" }}>
          <IconSymbol size={28} name="chevron.left" color="#000" />
          <Text style={styles.header}>Add Product</Text>
        </TouchableOpacity>

        {/* ---------------------- INPUTS ---------------------- */}
        <TextInput
          placeholder="Product Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Description"
          style={[styles.input, { height: 100 }]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          placeholder="Price"
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          placeholder="Stock Quantity"
          style={styles.input}
          keyboardType="numeric"
          value={stockQuantity}
          onChangeText={setStockQuantity}
        />

        <TextInput
          placeholder="Discount %"
          style={styles.input}
          keyboardType="numeric"
          value={discountPercentage}
          onChangeText={setDiscountPercentage}
        />

        {/* ---------------------- SINGLE IMAGE UPLOAD ---------------------- */}
        <TouchableOpacity onPress={pickSingleImage} style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>
            {upload.loading ? "Uploading..." : "Pick Main Image"}
          </Text>
        </TouchableOpacity>

        {upload.image ? (
          <Image
            source={{ uri: upload.image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
        ) : null}

        {/* ---------------------- GALLERY UPLOAD ---------------------- */}
        <TouchableOpacity onPress={pickGalleryImages} style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>
            {upload.loading ? "Uploading..." : "Pick Gallery Images"}
          </Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upload.images?.map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                margin: 5,
              }}
            />
          ))}
        </ScrollView>

        {/* ---------------------- SUBMIT ---------------------- */}
        <TouchableOpacity
          style={styles.btnPrimary}
          disabled={productState.loading}
          onPress={handleCreate}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>
            {productState.loading ? "Creating..." : "Create Product"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000",
  },
  input: {
    // backgroundColor: "#222",
    padding: 12,
    color: "#000",
    borderRadius: 8,
    marginBottom: 12,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnOutlineText: { color: "#ccc" },
  btnPrimary: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
