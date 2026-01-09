import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
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

const PRIMARY = "#0ea5e9";
const BG = "#f8fafc";
const CARD = "#ffffff";
const BORDER = "#e2e8f0";
const TEXT = "#0f172a";
const SUBTLE = "#64748b";

export default function PosScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>POS</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* CUSTOMER + PAYMENT */}
      <View style={styles.topRow}>
        <SelectCard
          icon="user"
          label="Customer"
          value="Walk-in Customer"
          flex={3}
        />
        <SelectCard
          icon="money-bill-wave"
          label="Method"
          value="Cash"
          flex={2}
        />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={18} color={SUBTLE} />
        <TextInput
          placeholder="Search item by name or code..."
          style={styles.searchInput}
          placeholderTextColor={SUBTLE}
        />
        <FontAwesome5 name="qrcode" size={20} color={SUBTLE} />
      </View>

      {/* CART LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 260 }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cart Items (4)</Text>
          <TouchableOpacity>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        <CartItem
          title="Wireless Mouse M185"
          category="Electronics"
          price={15}
          qty={1}
        />

        <CartItem
          title="Mech Keyboard K2"
          category="Electronics"
          price={85}
          qty={1}
        />
      </ScrollView>

      {/* FIXED BOTTOM SHEET */}

      <View style={styles.bottomSheet}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Quantity</Text>
            <Text style={styles.summaryValue}>5 Items</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>$132.00</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saleBtn}>
          <Text style={styles.saleText}>Create Sale</Text>
          <FontAwesome5 name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SelectCard({ icon, label, value, flex }) {
  return (
    <TouchableOpacity style={[styles.selectCard, { flex }]}>
      <FontAwesome5 name={icon} size={18} color={PRIMARY} />
      <View style={{ flex: 1 }}>
        <Text style={styles.selectLabel}>{label}</Text>
        <Text style={styles.selectValue}>{value}</Text>
      </View>
      <FontAwesome5 name="chevron-down" size={14} color={SUBTLE} />
    </TouchableOpacity>
  );
}

function CartItem({ title, category, price, qty, image }) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemTop}>
        <Image source={{ uri: image }} style={styles.itemImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemPrice}>MRP ${price}</Text>
        </View>
      </View>

      <View style={styles.itemBottom}>
        <View style={styles.qtyBox}>
          <TouchableOpacity style={styles.qtyBtn}>
            <FontAwesome5 name="minus" size={12} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity style={[styles.qtyBtn, styles.qtyAdd]}>
            <FontAwesome5 name="plus" size={12} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtotal}>${(qty * price).toFixed(2)}</Text>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: BORDER,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
  },

  iconBtn: { width: 40, alignItems: "center" },

  topRow: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
  },

  selectCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: BORDER,
    borderRadius: 14,
    backgroundColor: "#fff",
  },

  selectLabel: {
    fontSize: 10,
    color: SUBTLE,
    fontWeight: "600",
  },

  selectValue: {
    fontSize: 14,
    fontWeight: "700",
    color: TEXT,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e2e8f0",
    marginHorizontal: 14,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: TEXT,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 14,
  },

  sectionTitle: { fontWeight: "700", color: SUBTLE },

  clearText: { color: PRIMARY, fontWeight: "600", fontSize: 12 },

  itemCard: {
    backgroundColor: CARD,
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },

  itemTop: { flexDirection: "row", gap: 12 },

  itemTitle: { fontWeight: "700", fontSize: 14 },
  itemPrice: { fontSize: 12, fontWeight: "600", marginTop: 4 },

  itemBottom: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: { flexDirection: "row", alignItems: "center", gap: 8 },

  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },

  qtyAdd: { backgroundColor: PRIMARY },
  qtyText: { fontWeight: "700" },

  subtotal: { fontSize: 18, fontWeight: "800" },

  bottomSheet: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: BORDER,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  summaryLabel: { fontSize: 12, color: SUBTLE, fontWeight: "600" },
  summaryValue: { fontSize: 16, fontWeight: "700" },
  totalAmount: { fontSize: 28, fontWeight: "900" },

  saleBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saleText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
