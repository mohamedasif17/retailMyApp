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

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const CARD = "#fff";
const SUBTLE = "#64748b";

const CUSTOMERS = [
  {
    id: "CUST-8832",
    name: "Johnathan Doe",
    bill: 1250,
    paid: 1000,
    due: 250,
    points: 150,
  },
  {
    id: "CUST-1025",
    name: "Alice Smith",
    bill: 500,
    paid: 500,
    due: 0,
    points: 50,
  },
  {
    id: "CUST-9901",
    name: "Elena Rodriguez",
    bill: 2450,
    paid: 2000,
    due: 450,
    points: 320,
  },
  {
    id: "CUST-5512",
    name: "Michael K.",
    bill: 120,
    paid: 120,
    due: 0,
    points: 12,
  },
  // add more to test pagination
];

export default function CustomerListScreen() {
  const navigation = useNavigation();

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(CUSTOMERS.length / itemsPerPage);

  const pagedCustomers = CUSTOMERS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customers</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* LIST */}
      <ScrollView contentContainerStyle={{ paddingBottom: 180 , marginTop:10}}>
        {pagedCustomers.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* TOP */}
            <View style={styles.cardTop}>
              <View style={styles.left}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name.substring(0, 2).toUpperCase()}
                  </Text>
                </View>

                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.id}>ID: #{item.id}</Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.iconBtn}  onPress={() => navigation.navigate("CreateCustomer")}>
                  <FontAwesome5 name="edit" size={18} color={SUBTLE} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <FontAwesome5 name="trash" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            {/* STATS */}
            <View style={styles.statsRow}>
              <Info label="BILL" value={`₹${item.bill}`} />
              <Info label="PAID" value={`₹${item.paid}`} />
              <Info
                label="DUE"
                value={`₹${item.due}`}
                color={item.due > 0 ? "#ef4444" : "#16a34a"}
              />
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.label}>PTS</Text>
                <View style={styles.row}>
                  <FontAwesome5 name="star" size={14} color="#facc15" />
                  <Text style={styles.points}>{item.points}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* PAGINATION (SAME AS PURCHASE) */}
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

      {/* FAB */}
      <TouchableOpacity style={styles.fab}   onPress={() => navigation.navigate("CreateCustomer")}>
        <FontAwesome5 name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* SMALL INFO */
const Info = ({ label, value, color }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, color && { color }]}>{value}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },

  card: {
    backgroundColor: CARD,
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 14,
  },

  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  left: { flexDirection: "row", gap: 12 },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "700", color: PRIMARY, fontSize: 16 },

  name: { fontSize: 15, fontWeight: "700" },
  id: { fontSize: 12, color: SUBTLE },

  actions: { flexDirection: "row", gap: 6 },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
  },

  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 12 },

  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  row: { flexDirection: "row", alignItems: "center", gap: 4 },

  label: { fontSize: 10, fontWeight: "700", color: "#94a3b8" },
  value: { fontSize: 14, fontWeight: "600" },
  points: { fontWeight: "700", color: PRIMARY },

  /* Pagination */
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 12,
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  navBtn: {
    padding: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
  },
  pages: { flexDirection: "row", gap: 8 },
  page: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f1f5f9",
    color: SUBTLE,
    fontWeight: "700",
    textAlign: "center",
    minWidth: 34, // ensures equal size
  },

  pageActive: {
    backgroundColor: "#1193d4",
    color: "#fff",

    width: 34,
    height: 34,
    borderRadius: 17, // 👈 perfect circle
    lineHeight: 34, // 👈 center text vertically
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
