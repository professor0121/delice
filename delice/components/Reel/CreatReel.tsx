import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import api from "../../redux/api/axiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateReel({ navigation }: any) {
  const [caption, setCaption] = useState("");
  const [video, setVideo] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // PICK VIDEO
  // ---------------------------
  const pickVideo = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!res.canceled) {
      setVideo(res.assets[0]);
    }
  };

  // ---------------------------
  // PICK THUMBNAIL IMAGE
  // ---------------------------
  const pickThumbnail = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!res.canceled) {
      setThumbnail(res.assets[0]);
    }
  };

  // ---------------------------
  // UPLOAD FILE TO BACKEND
  // ---------------------------
  const uploadFile = async (file: any, type: "video" | "image") => {
    const formData = new FormData();

    formData.append("file", {
      uri: file.uri,
      name: file.fileName || `${type}.mp4`,
      type: file.mimeType || (type === "video" ? "video/mp4" : "image/jpeg"),
    } as any);

    const res = await api.post(`/upload/single`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  };

  // ---------------------------
  // CREATE REEL
  // ---------------------------
  const handleCreateReel = async () => {
    if (!video) {
      alert("Please select a video!");
      return;
    }

    setLoading(true);

    try {
      // Upload video
      const videoUrl = await uploadFile(video, "video");

      // Upload thumbnail (optional)
      let thumbUrl = null;
      if (thumbnail) {
        thumbUrl = await uploadFile(thumbnail, "image");
      }

      // Save reel metadata
      await api.post("/reels", {
        caption,
        videoUrl,
        thumbnailUrl: thumbUrl,
      });

      alert("Reel created!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("Failed to create reel");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create Reel 🎬</Text>

      {/* PICK VIDEO BUTTON */}
      <TouchableOpacity style={styles.btn} onPress={pickVideo}>
        <Text style={styles.btnText}>
          {video ? "Change Video" : "Pick Video"}
        </Text>
      </TouchableOpacity>

      {/* VIDEO PREVIEW */}
      {video && (
        <Video
          source={{ uri: video.uri }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.COVER}
        />
      )}

      {/* PICK THUMBNAIL BUTTON */}
      <TouchableOpacity style={styles.btnSecondary} onPress={pickThumbnail}>
        <Text style={styles.btnText}>
          {thumbnail ? "Change Thumbnail" : "Add Thumbnail (Optional)"}
        </Text>
      </TouchableOpacity>

      {/* THUMBNAIL PREVIEW */}
      {thumbnail && <Image source={{ uri: thumbnail.uri }} style={styles.thumb} />}

      {/* CAPTION INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        placeholderTextColor="#666"
        value={caption}
        onChangeText={setCaption}
      />

      {/* CREATE BUTTON */}
      <TouchableOpacity
        style={styles.btnCreate}
        disabled={loading}
        onPress={handleCreateReel}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnCreateText}>Upload Reel</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ---------------------------
// STYLES
// ---------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnSecondary: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  video: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  thumb: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 16,
  },
  btnCreate: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnCreateText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
