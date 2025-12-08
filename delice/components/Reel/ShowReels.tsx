import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  StatusBar,
  ListRenderItemInfo,
  ViewToken,
} from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/icon-symbol";
import { MaterialIcons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// -----------------------------
// TYPES
// -----------------------------
interface ReelItemType {
  id: string;
  uri: string;
  caption: string;
  liked?: boolean; // optional
}

interface ReelItemProps {
  item: ReelItemType;
  isActive: boolean;
  onToggleMute: (muted: boolean) => void;
  muted: boolean;
}

// Sample data
const SAMPLE_REELS: ReelItemType[] = [
  {
    id: "1",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    caption: "Big Buck Bunny",
    liked: false,
  },
  {
    id: "2",
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    caption: "Elephant's Dream",
    liked: false,
  },
  {
    id: "3",
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    caption: "Joyrides",
    liked: false,
  },
];

const ReelItem: React.FC<ReelItemProps> = ({
  item,
  isActive,
  onToggleMute,
  muted,
}) => {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const managePlayback = async () => {
      if (!videoRef.current) return;
      try {
        if (isActive) {
          await videoRef.current.playAsync();
        } else {
          await videoRef.current.pauseAsync();
        }
      } catch (e) {}
    };
    managePlayback();
  }, [isActive]);

  const onPlaybackStatusUpdate = (s: AVPlaybackStatus) => {
    setStatus(s);
    setLoading(
      !("isLoaded" in s && s.isLoaded) || ("isBuffering" in s && s.isBuffering)
    );
  };

 const handleToggleMute = async () => {
  if (!videoRef.current) return;
  try {
    await videoRef.current.setIsMutedAsync(!muted);
    onToggleMute(!muted); // update parent state
  } catch (e) {
    console.log(e);
  }
};


  return (
    <View style={styles.reelContainer}>
      <TouchableOpacity 
       activeOpacity={1} 
      onPress={handleToggleMute}
      style={styles.reelContainer}>
      <Video
        ref={videoRef}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        useNativeControls={false}
        isMuted={muted}
        progressUpdateIntervalMillis={200}
      />
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={styles.controlsOverlay}>
        <View style={styles.leftColumn}>
          {/* Profile + Follow */}
          <View style={styles.profileContainer}>
            <View style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userNameTxt}>userName</Text>
              <Text style={styles.musicTxt}>musicview</Text>
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
        <View style={styles.rightColumn}>
          {/* ❤️ Like */}
          <TouchableOpacity
            style={{ alignItems: "center", marginBottom: 20 }}
            onPress={() => setLiked(!liked)}
          >
            <MaterialIcons
              name={liked ? "favorite" : "favorite-border"}
              size={36}
              color={liked ? "#ff004f" : "#fff"}
            />
            <Text style={styles.actionText}>{liked ? "1.2k" : "1.2k"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => console.log("open comments")}
          >
            <MaterialIcons
              name="chat-bubble-outline" // outline comment icon
              size={32}
              color="#fff"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>45</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => console.log("share")}
          >
            <MaterialIcons
              name="share"
              size={32}
              color="#fff"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => console.log("music")}
          >
            <MaterialIcons
              name="library-music"
              size={32}
              color="#fff"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Music</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ShowReels: React.FC = () => {
  const [data] = useState<ReelItemType[]>(SAMPLE_REELS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(true);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const onViewRef = useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems && info.viewableItems.length > 0) {
      const index = info.viewableItems[0].index;
      if (typeof index === "number") setCurrentIndex(index);
    }
  });

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ReelItemType>) => (
      <ReelItem
        item={item}
        isActive={index === currentIndex}
        onToggleMute={setMuted}
        muted={muted}
      />
    ),
    [currentIndex, muted]
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} translucent backgroundColor="transparent" />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig.current}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>
          Index: {currentIndex + 1} / {data.length} •{" "}
          {muted ? "Muted" : "Sound"}
        </Text>
      </View> */}
    </View>
  );
};

export default ShowReels;

// -----------------------------
// STYLES
// -----------------------------
const styles = StyleSheet.create({
  actionBtn: {
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  userNameTxt: {
    color: "#fff",
    fontSize: 16,
  },
  musicTxt: {
    color: "#fff",
    fontSize: 14,
  },
  actionIcon: {
    fontSize: 32,
    color: "#fff",
  },

  actionText: {
    color: "#fff",
    // marginTop: 4,
    fontSize: 12,
  },

  profileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginBottom: 6,
  },

  followBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fff",
  },

  followText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  container: { flex: 1, backgroundColor: "#000" },
  reelContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
    video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  controlsOverlay: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    width: 80,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // paddingBottom: 24,
  },
  caption: { color: "#fff", fontSize: 16, marginBottom: 12 },
  controlButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
  },
  controlText: { color: "#fff", fontSize: 12 },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 60,
    alignSelf: "center",
  },
  footerText: { color: "#fff" },
});
