import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    accountType?: string;
    email: string;
    password: string;
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [accountType, setAccountType] = useState("Personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";

  const handlePress = () => {
    if (isRegister) {
      onSubmit({
        firstName,
        lastName,
        userName,
        accountType,
        email,
        password,
      });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? "Register" : "Login"}</Text>

      {isRegister && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={userName}
            onChangeText={setUserName}
          />

          {/* Simple Account Type Selector */}
          <View style={styles.accountTypeContainer}>
            <TouchableOpacity
              onPress={() => setAccountType("Personal")}
              style={[
                styles.typeButton,
                accountType === "Personal" && styles.typeButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  accountType === "Personal" && styles.typeButtonTextActive,
                ]}
              >
                Personal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAccountType("Business")}
              style={[
                styles.typeButton,
                accountType === "Business" && styles.typeButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  accountType === "Business" && styles.typeButtonTextActive,
                ]}
              >
                Business
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>
          {isRegister ? "Create Account" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => {
          if (isRegister) {
            router.replace("/(auth)/login");
          } else {
            router.replace("/(auth)/register");
          }
        }}
      >
        <Text>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Account Type
  accountTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  typeButtonActive: {
    backgroundColor: "black",
  },
  typeButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
  },
  typeButtonTextActive: {
    color: "white",
    fontWeight: "bold",
  },
});
