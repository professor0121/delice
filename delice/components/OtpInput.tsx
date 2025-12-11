import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

interface OtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1); // only one character per input
    setOtpValues(newOtpValues);
    onChange(newOtpValues.join(""));
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <TextInput
            key={i}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={otpValues[i]}
            onChangeText={(value) => handleChange(value, i)}
          />
        ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 40,
    height: 50,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
  },
});