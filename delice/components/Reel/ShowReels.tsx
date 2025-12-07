// // src/components/Reel/ShowReels.tsx
// import React, { useRef, useCallback, useEffect } from "react";
// import { View, FlatList, Dimensions, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
// import { Video } from "expo-av";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { getReels } from "@/redux/slices/reels.slice";
// import { useNavigation } from "@react-navigation/native";

// const { height: H } = Dimensions.get("window");

// export default function ShowReels() {
//   const dispatch = useAppDispatch();
//   const navigation = useNavigation();
//   const { list, loading } = useAppSelector((s) => s.reels);

//   useEffect(() => {
//     dispatch(getReels({ page: 1, limit: 20 }));
//   }, []);

//   // refs of video players
//   const players = useRef<Record<string, Video | null>>({});

//   // viewability config
//   const onViewRef = useRef(({ viewableItems }: any) => {
//     // pause all then play the first fully visible
//     Object.values(players.current).forEach((p: any) => {
//       if (!p) return;
//       try { p.pauseAsync(); } catch (e) {}
//     });

//     if (viewableItems.length > 0) {
//       const first = viewableItems[0].item;
//       const player = players.current[first._id];
//       if (player) {
//         try { player.playAsync(); } catch (e) {}
//       }
//     }
//   });

//   const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 75, itemVisiblePercentThreshold: 75 });

//   const renderItem = useCallback(({ item }: any) => {
//     return (
//       <View style={styles.page}>
//         <Video
//           ref={(ref) => { players.current[item._id] = ref; }}
//           source={{ uri: item.videoUrl }}
//           style={styles.video}
//           resizeMode="cover"
//           isLooping
//           shouldPlay={false} // controlled by viewability
//           useNativeControls={false}
//         />

//         <View style={styles.overlay}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.caption}>{item.caption}</Text>
//             <Text style={styles.addedBy}>by {item.addedBy?.firstName || item.addedBy?.email || "user"}</Text>
//           </View>

//           <View style={{ width: 100, alignItems: "center" }}>
//             <TouchableOpacity onPress={() => navigation.navigate("EditReel", { reelId: item._id })}>
//               <Text style={{ color: "#fff", marginBottom: 12 }}>Edit</Text>
//             </TouchableOpacity>
//             <Text style={{ color: "#fff" }}>{item.views || 0} views</Text>
//           </View>
//         </View>
//       </View>
//     );
//   }, []);

//   if (loading && list.length === 0) return <View style={styles.center}><ActivityIndicator /></View>;

//   return (
//     <FlatList
//       data={list}
//       keyExtractor={(i) => i._id}
//       renderItem={renderItem}
//       pagingEnabled
//       decelerationRate="fast"
//       snapToInterval={H}
//       showsVerticalScrollIndicator={false}
//       onViewableItemsChanged={onViewRef.current}
//       viewabilityConfig={viewConfigRef.current}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   page: { height: H, backgroundColor: "#000" },
//   video: { width: "100%", height: "100%" },
//   overlay: { position: "absolute", bottom: 40, left: 16, right: 16, flexDirection: "row", alignItems: "flex-end" },
//   caption: { color: "#fff", fontSize: 16, marginBottom: 6 },
//   addedBy: { color: "#ddd", fontSize: 12 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
// });
import React from 'react'
import { View ,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ShowReels = () => {
  return (
    <SafeAreaView>
   <View>
      <Text>this is show reel</Text>
   </View>
   </SafeAreaView>
  )
}

export default ShowReels
