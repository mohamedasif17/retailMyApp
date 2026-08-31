import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const BORDER = "#dbe2e6";
const TEXT = "#111618";
const SUBTLE = "#617c89";

export default function CreateCustomerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={18} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Customer</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <Input label="Full Name (Required)" placeholder="John Doe" />
          <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
          <Input label="WhatsApp" placeholder="+1 (555) 000-0000" />

          <Select label="Customer Group">
            <Picker.Item label="Select group" value="" />
            <Picker.Item label="Retail (Default)" value="retail" />
            <Picker.Item label="Wholesale" value="wholesale" />
            <Picker.Item label="VIP" value="vip" />
            <Picker.Item label="Employee" value="employee" />
            <Picker.Item label="Waling customer" value="walking" />
          </Select>
          <Select label="Avoid Points Group">
            <Picker.Item label="Select " value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
        
          </Select>
        </Section>

        <Divider />

        {/* BUSINESS DETAILS */}
        <Section title="Business Details">
          <Input label="Company Name" placeholder="Acme Corp" />
          <Input label="Tax Number / VAT" placeholder="TX-123456789" />
        </Section>

        <Divider />

        {/* ADDRESS */}
        <Section title="Address & Location">
          <Row>
            <Input label="Area" placeholder="Brooklyn" />
            <Input label="District" placeholder="Downtown" />
          </Row>

          <TextArea
            label="Full Address"
            placeholder="Street name, Building No, Apartment No"
          />
        </Section>

        <Divider />

        {/* LOYALTY */}
        <Section title="Loyalty Program">
          <Label>Initial Reward Points</Label>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>0</Text>
            <FontAwesome5 name="star" size={18} color={PRIMARY} />
          </View>
        </Section>
      </ScrollView>

      {/* FIXED BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.createBtn}>
          <FontAwesome5 name="user-plus" size={18} color="#fff" />
          <Text style={styles.createText}>Create Customer</Text>
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
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        placeholderTextColor={SUBTLE}
      />
    </View>
  );
}

function Select({ label, children }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Label>{label}</Label>
      <View style={styles.selectBox}>
        <Picker>{children}</Picker>
      </View>
    </View>
  );
}

function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

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

  clearText: {
    color: PRIMARY,
    fontWeight: "700",
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

  readOnlyText: {
    fontSize: 16,
    fontWeight: "700",
    color: SUBTLE,
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
