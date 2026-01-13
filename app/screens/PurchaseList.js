import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function PurchaseListScreen() {
  const PRIMARY = "#1193d4";
  const SUBTLE = "#64748b";
  const navigation = useNavigation();

  // --- PURCHASE DATA ---
  const purchases = [
    {
      supplier: "Tech Distributors Inc.",
      id: "PUR-8922",
      amount: "$1,250.00",
      location: "Main Warehouse",
      statuses: ["Received", "Pending Pay"],
      color: "#2563eb",
    },
    {
      supplier: "Global Foods Ltd.",
      id: "PUR-8921",
      amount: "$432.50",
      location: "Downtown Branch",
      statuses: ["Ordered", "Paid"],
      color: "#9333ea",
    },
    {
      supplier: "Office Supply Co.",
      id: "PUR-8920",
      amount: "$89.00",
      location: "HQ Office",
      statuses: ["Cancelled", "Refunded"],
      color: "#64748b",
      cancelled: true,
    },
    {
      supplier: "Fashion Wholesaler",
      id: "PUR-8919",
      amount: "$2,800.00",
      location: "Main Warehouse",
      statuses: ["Received", "Paid"],
      color: "#14b8a6",
    },
    {
      supplier: "Local Supplier",
      id: "PUR-8918",
      amount: "$560.00",
      location: "Branch 2",
      statuses: ["Ordered", "Pending Pay"],
      color: "#f97316",
    },
    {
      supplier: "Another Supplier",
      id: "PUR-8917",
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
    {
      supplier: "Another Supplier Duplicate",
      id: "PUR-8916", // <--- Make this unique
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
    {
      supplier: "Another Supplier Duplicate",
      id: "PUR-8915", // <--- Make this unique
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
    {
      supplier: "Another Supplier Duplicate",
      id: "PUR-8914", // <--- Make this unique
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
    {
      supplier: "Another Supplier Duplicate",
      id: "PUR-8913", // <--- Make this unique
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
    {
      supplier: "Another Supplier Duplicate",
      id: "PUR-8912", // <--- Make this unique
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
    {
      supplier: "Another Supplier Duplicate",
      id: "PUR-8911", // <--- Make this unique
      amount: "$1,120.50",
      location: "Warehouse 3",
      statuses: ["Received"],
      color: "#9333ea",
    },
  ];

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // adjust as needed
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  const pagedPurchases = purchases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // --- BADGE COLOR FUNCTION ---
  const badgeColor = (status) => {
    switch (status) {
      case "Received":
      case "Paid":
        return styles.green;
      case "Ordered":
        return styles.blue;
      case "Pending Pay":
        return styles.orange;
      case "Cancelled":
        return styles.red;
      case "Refunded":
        return styles.gray;
      default:
        return styles.gray;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color={"#111"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchase List</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* LIST */}
      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        {pagedPurchases.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* TOP */}
            <View style={styles.cardTop}>
              <View style={styles.left}>
                <View>
                  <Text style={styles.supplier}>{item.supplier}</Text>
                  <Text style={styles.purchaseId}>#{item.id}</Text>
                </View>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={[
                    styles.amount,
                    item.cancelled && styles.amountCancelled,
                  ]}
                >
                  {item.amount}
                </Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* BOTTOM */}
            <View style={styles.cardBottom}>
              <View style={styles.badges}>
                {item.statuses.map((s) => (
                  <Text key={s} style={[styles.badge, badgeColor(s)]}>
                    {s}
                  </Text>
                ))}
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.iconBtn}>
                  <FontAwesome5 name="print" size={18} color={SUBTLE} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <FontAwesome5 name="trash" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* PAGINATION */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => goToPage(currentPage - 1)}
          style={styles.navBtn}
        >
          <FontAwesome5 name="chevron-left" size={18} color={SUBTLE} />
        </TouchableOpacity>

        <View style={styles.pages}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <TouchableOpacity key={p} onPress={() => goToPage(p)}>
              <Text
                style={[styles.page, currentPage === p && styles.pageActive]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => goToPage(currentPage + 1)}
          style={styles.navBtn}
        >
          <FontAwesome5 name="chevron-right" size={18} color={SUBTLE} />
        </TouchableOpacity>
      </View>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddPurchase")}
      >
        <FontAwesome5 name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  left: { flexDirection: "row", gap: 12 },

  supplier: { fontWeight: "700", fontSize: 14 },
  purchaseId: { fontSize: 12, color: "#1193d4", fontWeight: "600" },
  amount: { fontSize: 16, fontWeight: "700" },
  amountCancelled: { color: "#94a3b8", textDecorationLine: "line-through" },
  location: { fontSize: 12, color: "#64748b" },

  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 12 },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badges: { flexDirection: "row", gap: 6 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: "700",
  },
  green: { backgroundColor: "#dcfce7", color: "#15803d" },
  orange: { backgroundColor: "#ffedd5", color: "#c2410c" },
  blue: { backgroundColor: "#e0f2fe", color: "#0369a1" },
  red: { backgroundColor: "#fee2e2", color: "#b91c1c" },
  gray: { backgroundColor: "#e5e7eb", color: "#475569" },

  actions: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1193d4",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  /* Pagination */
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 12,
  },
  navBtn: { padding: 6, backgroundColor: "#f1f5f9", borderRadius: 6 },
  pages: { flexDirection: "row", gap: 8 },
  page: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    fontWeight: "700",
  },
  pageActive: { backgroundColor: "#1193d4", color: "#fff" },
});
