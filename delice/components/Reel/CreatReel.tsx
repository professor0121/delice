import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { uploadReelVideo } from "@/redux/slice/upload.slice";
import { createReel } from "@/redux/slice/reel.slice";
import { getProducts } from "@/redux/slice/product.slice";

interface CreatReelProps {
  navigation: {
    goBack: () => void;
  };
}

interface VideoAsset {
  uri: string;
  fileName?: string | null;
  type?: string;
}

const CreatReel: React.FC<CreatReelProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const reel = useAppSelector((state: any) => state.upload);
  const { user } = useAppSelector((state: any) => state.auth);
  const { products } = useAppSelector((s: any) => s.product);

  const productList = Array.isArray(products) ? products : [];

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [video, setVideo] = useState<VideoAsset | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // const products: string[] = ["Shoes", "T-Shirt", "Bag", "Watch", "Laptop"];

  // console.log(products);
  console.log(reel);
  // ---- PICK VIDEO ----
  const pickVideo = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!res.canceled) {
      const file = res.assets[0];

      // Convert Expo file to JS File for Axios / Multer
      const videoFile = {
        uri: file.uri,
        name: file.fileName || `video-${Date.now()}.mp4`,
        type: file.type ? `${file.type}/mp4` : "video/mp4",
      };

      setVideo(file); // update UI
      dispatch(uploadReelVideo(videoFile as any));
    }
  };
  console.log(reel);
  const handleCreate = () => {
    if (!reel.reelVideo) {
      alert("Please select and upload a video first!");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    dispatch(
      createReel({
        title,
        description,
        videoUrl: reel.reelVideo, // use uploaded video URL
        reelProduct: selectedProduct || "", // product selected from dropdown
        postedBy: user._id, // replace with actual user ID if needed
      })
    );
    Alert.alert("Reel Creation", "Your Reel has been creted successfully !");
    // reset local states after creation
    setTitle("");
    setDescription("");
    setVideo(null);
    setSelectedProduct("");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {/* HEADER */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconSymbol size={28} name="chevron.left" color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Add Reel</Text>
      </View>

      {/* INPUTS */}
      <View style={{ gap: 12, flex: 1 }}>
        <TextInput
          placeholder="Enter reel title"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 8,
          }}
        />

        <TextInput
          placeholder="Enter reel description"
          value={description}
          onChangeText={setDescription}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 8,
          }}
        />

        {/* VIDEO PICKER */}
        <TouchableOpacity
          onPress={pickVideo}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text>{video ? "Change Video" : "Select Video"}</Text>
        </TouchableOpacity>

        {/* PRODUCT DROPDOWN */}
        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text>
            {selectedProduct ? selectedProduct : "Select product from list"}
          </Text>
        </TouchableOpacity>

        {/* DROPDOWN MODAL */}
        <Modal visible={dropdownVisible} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <View
              style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}
            >
              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                Select Product
              </Text>

              <FlatList
                data={productList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProduct(item._id);
                      setDropdownVisible(false);
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <Text
                    style={{ textAlign: "center", padding: 10, color: "#999" }}
                  >
                    No products available
                  </Text>
                )}
              />

              <TouchableOpacity
                onPress={() => setDropdownVisible(false)}
                style={{
                  marginTop: 10,
                  padding: 12,
                  backgroundColor: "#ddd",
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* CREATE BUTTON */}
      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "#000",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Create Reel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreatReel;
