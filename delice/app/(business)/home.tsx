import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LogOut } from "@/components/LogOut";
import { BusinessStackParamList } from "@/types/navigetion";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

type Nav = NativeStackNavigationProp<BusinessStackParamList, "BusinessHome">;

export default function BusinessHome() {
  const navigation = useNavigation<Nav>();

  // Dashboard sections with navigation target, icon, and optional badge
  const sections: {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
    screen: keyof BusinessStackParamList;
    badge?: number;
  }[] = [
    {
      id: "1",
      title: "My Products",
      description: "View and manage your products",
      icon: <FontAwesome5 name="box-open" size={24} color="#007AFF" />,
      screen: "Products",
      badge: 5,
    },
    {
      id: "2",
      title: "Orders",
      description: "Check recent orders and status",
      icon: <MaterialIcons name="shopping-cart" size={24} color="#28A745" />,
      screen: "Orders",
      badge: 2,
    },
    {
      id: "3",
      title: "Analytics",
      description: "View sales & performance stats",
      icon: <MaterialIcons name="analytics" size={24} color="#FFC107" />,
      screen: "Analytics",
    },
    {
      id: "4",
      title: "Messages",
      description: "Customer inquiries & chats",
      icon: <MaterialIcons name="message" size={24} color="#6F42C1" />,
      screen: "Messages",
      badge: 3,
    },
    {
      id: "5",
      title: "Promotions",
      description: "Create discounts & offers",
      icon: <MaterialIcons name="local-offer" size={24} color="#E83E8C" />,
      screen: "Promotions",
    },
    {
      id: "6",
      title: "Settings",
      description: "Manage business account settings",
      icon: <MaterialIcons name="settings" size={24} color="#343A40" />,
      screen: "Settings",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Business Dashboard</Text>

      {sections.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={styles.sectionCard}
          onPress={() => navigation.navigate(section.screen)}
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

      <View style={{ marginTop: 20 }}>
        {/* <LogOut /> */}
      </View>
    </ScrollView>
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
