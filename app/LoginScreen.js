import React, { useState } from "react";
import { StatusBar } from "react-native";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Login({ navigation }) {
  const PRIMARY = "#1193d4";
  const BG = "#f6f7f8";
  const TEXT = "#111618";
  const SUBTLE = "#617c89";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  
 
  const handleLogin = () => {
  let valid = true;

  setEmailError("");
  setPasswordError("");

  if (!email) {
    setEmailError("Email is required");
    valid = false;
  } else if (!validateEmail(email)) {
    setEmailError("Invalid email format");
    valid = false;
  }

  if (!password) {
    setPasswordError("Password is required");
    valid = false;
  } else if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    valid = false;
  }

  if (!valid) return;

  // ✅ GO TO DRAWER
  navigation.replace("Drawer");
};

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        {/* Center Content */}
        <View style={styles.center}>
          <View style={styles.card}>
            {/* Header */}
            <Text style={styles.appTitle}>Retail POS</Text>
            <Text style={styles.welcome}>Welcome Back</Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <FontAwesome5 name="envelope" size={18} color={SUBTLE} />
              <TextInput
                placeholder="Email"
                placeholderTextColor={SUBTLE}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            {/* Password */}
            <View style={styles.inputWrapper}>
              <FontAwesome5 name="lock" size={18} color={SUBTLE} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={SUBTLE}
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: PRIMARY }]}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={[styles.signup, { color: PRIMARY }]}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
    padding: 16,
    justifyContent: "space-between",
  },
  safeContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#f6f7f8",
  },

  appTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#111618",
  },

  welcome: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 16,
    color: "#111618",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000008",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111618",
  },

  loginButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    alignItems: "center",
    paddingBottom: 10,
  },

  footerText: {
    color: "#617c89",
  },

  signup: {
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
});
