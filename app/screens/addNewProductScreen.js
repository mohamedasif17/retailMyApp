import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

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
const CARD = "#ffffff";
const BORDER = "#e5e7eb";
const TEXT = "#111827";
const SUBTLE = "#6b7280";

export default function AddItemScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={18} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Item</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* FORM */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input label="Item name" placeholder="e.g. Organic Milk 1L" />
          <TextArea
            label="Description"
            placeholder="Add details about the product..."
          />

          <View>
            <Label>Barcode</Label>
            <View style={styles.barcodeBox}>
              <TextInput
                style={[styles.input, { flex: 1, borderRightWidth: 0 }]}
                placeholder="Scan or enter code"
                placeholderTextColor={SUBTLE}
              />
            </View>
          </View>
        </Section>

        {/* PRICING */}
        <Section title="Pricing Details" bg>
          <Row>
            <Input
              label="Buying cost"
              placeholder="0.00"
              keyboardType="numeric"
            />
            <Input
              label="Selling price"
              placeholder="0.00"
              keyboardType="numeric"
              bold
            />
          </Row>
          <Input
            label="Offer price (Optional)"
            placeholder="0.00"
            keyboardType="numeric"
          />
        </Section>

        {/* TAX */}
        <Section title="Tax Information">
          <Row>
            <Input label="Tax code" placeholder="e.g. VAT-01" />
            <Input label="Tax (%)" placeholder="0" keyboardType="numeric" />
          </Row>

          <View style={styles.row}>
            <Select label="Tax type (Buying)">
              <Picker.Item label="Select location" value="Exclusive" />
              <Picker.Item label="Main Warehouse" value="Inclusive" />
              <Picker.Item label="Branch Store 1" value="branch" />
            </Select>

            <Select label="Tax type (Selling)">
              <Picker.Item label="Select account" value="" />
              <Picker.Item label="Cash Account" value="cash" />
              <Picker.Item label="Business Bank" value="bank" />
            </Select>
          </View>
        </Section>
      </ScrollView>

      {/* FIXED BOTTOM BUTTON */}
      <TouchableOpacity style={styles.addBtn}>
        <FontAwesome5 name="plus-circle" size={20} color="#fff" />
        <Text style={styles.addBtnText}>Add Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children, bg }) {
  return (
    <View style={[styles.section, bg && styles.sectionBg]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Label({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

function Input({ label, bold, ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <Label>{label}</Label>
      <TextInput
        style={[styles.input, bold && { fontWeight: "700" }]}
        placeholderTextColor={SUBTLE}
        {...props}
      />
    </View>
  );
}

function TextArea({ label, ...props }) {
  return (
    <View>
      <Label>{label}</Label>
      <TextInput
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
        placeholderTextColor={SUBTLE}
        {...props}
      />
    </View>
  );
}

function Select({ label, value }) {
  return (
    <View style={{ flex: 1 }}>
      <Label>{label}</Label>
      <TouchableOpacity style={styles.select}>
        <Text style={styles.selectText}>{value}</Text>
        <FontAwesome5 name="chevron-down" size={14} color={SUBTLE} />
      </TouchableOpacity>
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

  section: {
    padding: 14,
  },

  sectionBg: {
    backgroundColor: "#f9fafb",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: SUBTLE,
    marginBottom: 12,
    textTransform: "uppercase",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: TEXT,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 14,
    color: TEXT,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  barcodeBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  barcodeBtn: {
    height: 46,
    width: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  select: {
    height: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  selectText: {
    fontSize: 14,
    color: TEXT,
    fontWeight: "600",
  },

  addBtn: {
    height: 56,
    backgroundColor: PRIMARY,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  addBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
