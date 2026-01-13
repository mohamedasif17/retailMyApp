import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
    ScrollView,
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

export default function AddPurchaseScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
<FontAwesome5 name="chevron-left" size={18} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Purchase</Text>

      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* SUPPLIER INFO */}
        <Section title="Supplier Information">
          <Input label="Supplier name" placeholder="Search or enter supplier" />

          <View style={styles.row}>
            <Select label="Location">
              <Picker.Item label="Select location" value="" />
              <Picker.Item label="Main Warehouse" value="main" />
              <Picker.Item label="Branch Store 1" value="branch" />
            </Select>

            <Select label="Account">
              <Picker.Item label="Select account" value="" />
              <Picker.Item label="Cash Account" value="cash" />
              <Picker.Item label="Business Bank" value="bank" />
            </Select>
          </View>
        </Section>

        {/* PRODUCTS */}
        <Section title="Products">
          <View style={styles.searchBox}>
            <FontAwesome5 name="search" size={20} color="#999" />
            <TextInput
              placeholder="Search product by name or SKU"
              style={styles.searchInput}
            />
          </View>

          <ProductCard />
          <ProductCard disabled />
        </Section>

        {/* SUMMARY */}
        <Section title="Summary">
          <View style={styles.row}>
            <Input label="Tax Total" value="31.25" />
            <Input label="Extras (Shipping)" value="15.00" />
          </View>

          <View style={styles.row}>
            <Input label="Discount Total" value="5.00" />
            <Input
              label="Grand Total"
              value="776.50"
              highlight
              editable={false}
            />
          </View>
        </Section>

        {/* META */}
        <Section title="Order Info">
          <View style={styles.row}>
            <Select label="Order Status">
              <Picker.Item label="Received" value="received" />
              <Picker.Item label="Pending" value="pending" />
            </Select>

            <Select label="Payment Status">
              <Picker.Item label="Paid" value="paid" />
              <Picker.Item label="Due" value="due" />
            </Select>
          </View>

          <Input label="Invoice Number" placeholder="INV-2023-001" />
        </Section>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomSummary}>
          <Text style={styles.bottomText}>Items: 2 | Units: 70</Text>
          <Text style={styles.bottomAmount}>₹776.50</Text>
        </View>

        <TouchableOpacity style={styles.createBtn}>
          <FontAwesome5 name="cart-plus" size={18} color="#fff" />
          <Text style={styles.createText}>Create Purchase</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Input = ({ label, highlight, ...props }) => (
  <View style={{ flex: 1, marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...props}
      style={[
        styles.input,
        highlight && { borderColor: PRIMARY, backgroundColor: "#e8f4fb" },
      ]}
    />
  </View>
);

const Select = ({ label, children }) => (
  <View style={{ flex: 1, marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.select}>
      <Picker>{children}</Picker>
    </View>
  </View>
);

const ProductCard = ({ disabled }) => (
  <View style={[styles.productCard, disabled && { opacity: 0.6 }]}>
    <View style={styles.productHeader}>
      <View>
        <Text style={styles.productName}>Panadol Extra 500mg</Text>
        <Text style={styles.sku}>SKU: PH-00124</Text>
      </View>
      <FontAwesome5 name="trash" size={20} color="red" />
    </View>

    <View style={styles.grid}>
      <SmallInput label="Cost" value="12.50" />
      <SmallInput label="Tax %" value="5" />
      <SmallInput label="Qty" value="50" />
      <SmallInput label="Discount" value="0" />
      <SmallInput label="Subtotal" value="656.25" highlight />
    </View>
  </View>
);

const SmallInput = ({ label, highlight, ...props }) => (
  <View style={{ width: "30%", marginBottom: 10 }}>
    <Text style={styles.smallLabel}>{label}</Text>
    <TextInput
      {...props}
      style={[
        styles.smallInput,
        highlight && { color: PRIMARY, fontWeight: "700" },
      ]}
    />
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  content: {
    padding: 14,
    paddingBottom: 10,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#dbe2e6",
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
  },

  select: {
    borderWidth: 1,
    borderColor: "#dbe2e6",
    borderRadius: 10,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 14,
  },

  searchInput: { flex: 1, marginLeft: 8 },

  productCard: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  productName: { fontWeight: "700" },
  sku: { fontSize: 11, color: "#777" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallLabel: {
    fontSize: 10,
    color: "#888",
    marginBottom: 2,
  },

  smallInput: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    height: 36,
    paddingHorizontal: 6,
    fontSize: 12,
  },

  bottomBar: {
 
    backgroundColor: "#fff",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  bottomSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  bottomText: { color: "#666" },
  bottomAmount: { fontSize: 18, fontWeight: "800", color: PRIMARY },

  createBtn: {
    backgroundColor: PRIMARY,
    height: 52,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
