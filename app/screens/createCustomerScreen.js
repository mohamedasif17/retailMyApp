import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  DeviceEventEmitter,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const BORDER = "#dbe2e6";
const TEXT = "#111618";
const SUBTLE = "#617c89";

// თქვენი API URL
const API_URL = "http://10.189.46.215:8000/customers";

export default function CreateCustomerScreen({ navigation }) {
  // ================= STATE =================

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [customerGroup, setCustomerGroup] = useState("");
  const [avoidPoint, setAvoidPoint] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [loyalityPoints, setLoyalityPoints] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= CREATE CUSTOMER =================

  const createCustomer = async () => {
    // Required validation
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter customer name",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          phoneNumber: phoneNumber,
          whatsApp: whatsApp,

          // Backend API key names must match exactly
          avoidPoint: avoidPoint || "No",

          Customergroup: customerGroup || "Walking Customer",

          companyName: companyName,
          taxNumber: taxNumber,
          area: area,
          district: district,
          fullAddress: fullAddress,

          LoyalityPoints: loyalityPoints || "0",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create customer");
      }
          DeviceEventEmitter.emit("customerCreated");

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Customer created successfully",
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1500);

      console.log("Customer created:", data);
    } catch (error) {
      console.log("Create customer error:", error);

      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={18} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Customer</Text>

        {/* Empty View for center alignment */}
        <View style={{ width: 18 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <Input
            label={
              <>
                <Text style={{ color: "tomato" }}>Full Name (Required)</Text>
              </>
            }
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Input
            label="WhatsApp"
            placeholder="+1 (555) 000-0000"
            value={whatsApp}
            onChangeText={setWhatsApp}
            keyboardType="phone-pad"
          />

          {/* CUSTOMER GROUP */}
          <Select
            label="Customer Group"
            selectedValue={customerGroup}
            onValueChange={setCustomerGroup}
          >
            <Picker.Item label="Select group" value="" />

            <Picker.Item label="Retail" value="Retail" />

            <Picker.Item label="Wholesale" value="Wholesale" />

            <Picker.Item label="VIP" value="VIP" />

            <Picker.Item label="Employee" value="Employee" />

            <Picker.Item label="Walking Customer" value="Walking Customer" />
          </Select>

          {/* AVOID POINT */}
          <Select
            label="Avoid Points Group"
            selectedValue={avoidPoint}
            onValueChange={setAvoidPoint}
          >
            <Picker.Item label="Select" value="" />

            <Picker.Item label="Yes" value="Yes" />

            <Picker.Item label="No" value="No" />
          </Select>
        </Section>

        <Divider />

        {/* BUSINESS DETAILS */}
        <Section title="Business Details">
          <Input
            label="Company Name"
            placeholder="Acme Corp"
            value={companyName}
            onChangeText={setCompanyName}
          />

          <Input
            label="Tax Number / VAT"
            placeholder="TX-123456789"
            value={taxNumber}
            onChangeText={setTaxNumber}
          />
        </Section>

        <Divider />

        {/* ADDRESS */}
        <Section title="Address & Location">
          <Row>
            <View style={styles.halfInput}>
              <Input
                label="Area"
                placeholder="Brooklyn"
                value={area}
                onChangeText={setArea}
              />
            </View>

            <View style={styles.halfInput}>
              <Input
                label="District"
                placeholder="Downtown"
                value={district}
                onChangeText={setDistrict}
              />
            </View>
          </Row>

          <TextArea
            label="Full Address"
            placeholder="Street name, Building No, Apartment No"
            value={fullAddress}
            onChangeText={setFullAddress}
          />
        </Section>

        <Divider />

        {/* LOYALTY */}
        <Section title="Loyalty Program">
          <Label>Initial Reward Points</Label>

          <View style={styles.readOnlyBox}>
            <TextInput
              value={loyalityPoints}
              placeholder="Enter the points"
              onChangeText={setLoyalityPoints}
              keyboardType="numeric"
              style={styles.pointsInput}
            />

            <FontAwesome5 name="star" size={18} color={PRIMARY} />
          </View>
        </Section>
      </ScrollView>

      {/* FIXED BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.createBtn, loading && { opacity: 0.7 }]}
          onPress={createCustomer}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <FontAwesome5 name="user-plus" size={18} color="#fff" />

              <Text style={styles.createText}>Create Customer</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {children}
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function Label({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

function Input({ label, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Label>{label}</Label>

      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={SUBTLE}
      />
    </View>
  );
}

function TextArea({ label, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Label>{label}</Label>

      <TextInput
        {...props}
        multiline
        style={[
          styles.input,
          {
            height: 90,
            textAlignVertical: "top",
          },
        ]}
        placeholderTextColor={SUBTLE}
      />
    </View>
  );
}

function Select({ label, children, selectedValue, onValueChange }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Label>{label}</Label>

      <View style={styles.selectBox}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {children}
        </Picker>
      </View>
    </View>
  );
}

function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    height: 56,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },

  section: {
    padding: 14,
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
    color: TEXT,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: TEXT,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    color: TEXT,
  },

  selectBox: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  divider: {
    height: 10,
    backgroundColor: BG,
  },

  readOnlyBox: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f1f5f9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pointsInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },

  bottomBar: {
    padding: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: BORDER,
  },

  createBtn: {
    height: 56,
    backgroundColor: PRIMARY,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
