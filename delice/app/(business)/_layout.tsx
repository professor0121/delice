import { Tabs } from "expo-router";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestBusinessActivation } from "@/redux/slice/business.slice";

export default function BusinessLayout() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch=useAppDispatch();

  const handleActivationRequest = () => {
    dispatch(requestBusinessActivation())
  };


  if (user?.isActivatedBusinessAccount !== "Activated") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Business Account</Text>

        <Text style={styles.subtitle}>
          Your business account is not activated.{user?.isActivatedBusinessAccount}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleActivationRequest}
        >
          <Text style={styles.buttonText}>
            Send Request to Activate Business Account
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopColor: "#333",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Reel",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="camera.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Product",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="photo.on.rectangle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
