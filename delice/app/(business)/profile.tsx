import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAppSelector } from "@/redux/hooks";

export default function BusinessProfile() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={{
          uri:
            user.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />

      {/* Name */}
      <Text style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>

      {/* Username */}
      <Text style={styles.username}>@{user.userName}</Text>

      {/* Email */}
      <Text style={styles.email}>{user.email}</Text>

      {/* Account Type */}
      <Text style={styles.type}>
        Account Type: {user.accountType}
      </Text>

      {/* Business Activation */}
      <Text style={styles.businessStatus}>
        Business Account Status: {user.isActivatedBusinessAccount}
      </Text>

      {/* Followers / Following */}
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.number}>{user.followers.length}</Text>
          <Text style={styles.label}>Followers</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.number}>{user.following.length}</Text>
          <Text style={styles.label}>Following</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#000",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 20,
  },
  type: {
    fontSize: 18,
    color: "#4da6ff",
    marginBottom: 5,
  },
  businessStatus: {
    fontSize: 16,
    color: "#ffcc00",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
  },
  box: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  number: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#aaa",
  },
});
