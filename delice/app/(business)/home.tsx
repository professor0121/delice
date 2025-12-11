import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusinessHome() {
  const router = useRouter();

  const sections = [
    {
      id: "1",
      title: "My Products",
      description: "View and manage your products",
      icon: <FontAwesome5 name="box-open" size={24} color="#007AFF" />,
      screen: "/(business)/products",
      badge: 5,
    },
    {
      id: "2",
      title: "Orders",
      description: "Check recent orders and status",
      icon: <MaterialIcons name="shopping-cart" size={24} color="#28A745" />,
      screen: "/(business)/orders",
      badge: 2,
    },
    {
      id: "3",
      title: "Analytics",
      description: "View sales & performance stats",
      icon: <MaterialIcons name="analytics" size={24} color="#FFC107" />,
      screen: "/(business)/analytics",
    },
    {
      id: "4",
      title: "Messages",
      description: "Customer inquiries & chats",
      icon: <MaterialIcons name="message" size={24} color="#6F42C1" />,
      screen: "/(business)/messages",
      badge: 3,
    },
    {
      id: "5",
      title: "Promotions",
      description: "Create discounts & offers",
      icon: <MaterialIcons name="local-offer" size={24} color="#E83E8C" />,
      screen: "/(business)/promotions",
    },
    {
      id: "6",
      title: "Settings",
      description: "Manage business account settings",
      icon: <MaterialIcons name="settings" size={24} color="#343A40" />,
      screen: "/(business)/settings",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Business Dashboard</Text>

      {sections.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={styles.sectionCard}
          onPress={() => router.push(section.screen as any)}
        >
          <View style={styles.cardHeader}>
            {section.icon}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionDesc}>{section.description}</Text>
            </View>
            {section.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{section.badge}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
    textAlign: "center",
  },
  sectionCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  sectionDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});
