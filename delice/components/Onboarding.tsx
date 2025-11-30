import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface Props {
  image: any;
  title: string;
  description: string;
  nextButtonText?: string;
  nextButtonUrl: string;
}

const OnboardingComponent: React.FC<Props> = ({
  image,
  title,
  description,
  nextButtonText = "Next",
  nextButtonUrl,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Image */}
        <Image source={image} style={styles.image} resizeMode="contain" />

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push(nextButtonUrl as any)}
        >
          <Text style={styles.nextBtnText}>{nextButtonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingComponent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Skip Button */
  skipBtn: {
    position: "absolute",
    top: 0,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "500",
  },

  /* Responsive Image */
  image: {
    width: width * 0.8,       // 80% of screen width
    height: height * 0.32,    // 32% of screen height
    // marginTop:500
  },

  /* Title */
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },

  /* Description */
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    width: "85%",
    marginTop: 10,
  },

  /* Next Button */
  nextBtn: {
    marginTop: 40,
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  nextBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
