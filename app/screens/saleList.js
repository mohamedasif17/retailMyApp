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

export default function SalesListScreen() {

  const SUBTLE = "#617c89";
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("All");
  
 // Sample sales list (for example purpose, add more to test pagination)
  const allSales = Array.from({ length: 45 }, (_, i) => ({
    id: `INV-${10234 - i}`,
    date: `Oct ${24 - (i % 30)}, 2023 • ${10 + (i % 12)}:00`,
    customer: `Customer ${i + 1}`,
    amount: `$${(Math.random() * 500).toFixed(2)}`,
    status: ["Completed", "Pending", "Refunded"][i % 3],
    color: ["#1193d4", "#f59e0b", "#ef4444"][i % 3],
  }));
   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter sales by tab
  const filteredSales =
    activeTab === "All"
      ? allSales
      : allSales.filter((s) => s.status === activeTab);

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

  // Slice sales for current page
  const pagedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };
  const sales = [
    {
      id: "INV-10234",
      date: "Oct 24, 2023 • 14:30",
      customer: "John Doe",
      amount: "$145.50",
      status: "Completed",
      icon: "receipt-long",
      color: "#1193d4",
    },
    {
      id: "INV-10233",
      date: "Oct 24, 2023 • 13:15",
      customer: "Jane Smith",
      amount: "$54.00",
      status: "Pending",
      icon: "pending",
      color: "#f59e0b",
    },
    {
      id: "INV-10232",
      date: "Oct 23, 2023 • 09:45",
      customer: "Alice Cooper",
      amount: "$20.00",
      status: "Refunded",
      icon: "remove-shopping-cart",
      color: "#ef4444",
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color={"#111"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales </Text>
        <View style={{ width: 26 }} />
      </View>
      {/* FILTER TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {["All", "Completed", "Pending", "Refunded"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setActiveTab(t)}
            style={[styles.tab, activeTab === t && styles.tabActive]}
          >
            <Text
              style={[styles.tabText, activeTab === t && styles.tabTextActive]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    {/* LIST */}
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {pagedSales.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.cardLeft}>
                <View
                  style={[styles.roundIcon, { backgroundColor: item.color + "20" }]}
                >
                  <FontAwesome5 name="file-invoice" size={20} color={item.color} />
                </View>
                <View>
                  <Text style={styles.invoice}>{item.id}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>
              <View style={[styles.badge, badgeColor(item.status)]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.customerRow}>
              <FontAwesome5 name="user" size={16} color={SUBTLE} />
              <Text style={styles.customer}>{item.customer}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.amountLabel}>Total Amount</Text>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>

              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* PAGINATION */}
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => goToPage(currentPage - 1)} style={styles.navBtn}>
          <FontAwesome5 name="chevron-left" size={18} color={SUBTLE} />
        </TouchableOpacity>

        <View style={styles.pages}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <TouchableOpacity key={p} onPress={() => goToPage(p)}>
              <Text style={[styles.page, currentPage === p && styles.pageActive]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => goToPage(currentPage + 1)} style={styles.navBtn}>
          <FontAwesome5 name="chevron-right" size={18} color={SUBTLE} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
/* STATUS BADGE COLORS */
const badgeColor = (status) =>
  ({
    Completed: { backgroundColor: "#dcfce7", color: "#15803d" },
    Pending: { backgroundColor: "#ffedd5", color: "#c2410c" },
    Refunded: { backgroundColor: "#fee2e2", color: "#b91c1c" },
  }[status]);

/* STYLES */
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    elevation: 2,
  },
  iconBtn: { width: 40, alignItems: "center" },
  addBtn: { backgroundColor: "#e0f2fe", borderRadius: 20 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111618",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#111618",
  },

  tabs: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom:10
  },

  tab: {
    height: 36,
    minWidth: 90,
    backgroundColor: "#CBCBCB",
    paddingHorizontal: 16,
    borderRadius: 18,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#111618",
  },

  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111618",
    lineHeight: 16,
  },

  tabTextActive: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
  },

  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  cardLeft: { flexDirection: "row", gap: 12 },

  roundIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  invoice: { fontWeight: "700", fontSize: 16 },
  date: { color: "#617c89", fontSize: 12 },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: "center",
  },
  badgeText: { fontSize: 12, fontWeight: "700" },

  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  customer: { fontWeight: "600" },

  divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountLabel: { fontSize: 12, color: "#617c89" },
  amount: { fontSize: 18, fontWeight: "700", color: "#1193d4" },

  viewBtn: {
    backgroundColor: "#1193d4",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewText: { color: "#fff", fontWeight: "700" },

  paginationWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  pages: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  page: {
    minWidth: 32,
    height: 32,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 32,
    borderRadius: 16,
    color: "#617c89",
    fontSize: 13,
    fontWeight: "600",
  },

  pageActive: {
    backgroundColor: "#1193d4",
    color: "#fff",
  },
});
