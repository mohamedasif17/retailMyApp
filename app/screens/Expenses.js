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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function ExpenseScreen() {
  const PRIMARY = "#1193d4";

  const SUBTLE = "#64748b";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const expenses = [
    {
      title: "Restocking Inventory",
      amount: "$5,400.00",
      date: "Oct 24, 2023",
      color: "#1193d4",
    },
    {
      title: "Store Maintenance",
      amount: "$150.00",
      date: "Oct 23, 2023",
      color: "#f97316",
    },
    {
      title: "Electricity Bill",
      amount: "$320.50",
      date: "Oct 20, 2023",
      color: "#eab308",
    },
    {
      title: "Delivery Services",
      amount: "$85.00",
      date: "Oct 18, 2023",
      color: "#9333ea",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
    {
      title: "Staff Refreshments",
      amount: "$45.20",
      date: "Oct 15, 2023",
      color: "#14b8a6",
    },
  ];
  const expensesWithId = expenses.map((item, index) => ({
    ...item,
    id: `EXP-${1000 + expenses.length - index}`,
  }));

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const pagedExpenses = expensesWithId.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expenses</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* LIST */}
      {/* LIST */}
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {pagedExpenses.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardContent}>
              {/* TOP ROW */}
              <View style={styles.rowBetween}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>

              {/* BOTTOM ROW */}
              <View style={styles.rowBetween}>
                <Text style={styles.date}>
                  {item.id} • {item.date}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => navigation.navigate("CreateExpense")}
                  >
                    <FontAwesome5 name="edit" size={18} color={PRIMARY} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <FontAwesome5 name="trash" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FIXED PAGINATION (LIKE SALES LIST) */}
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

      {/* FAB ABOVE PAGINATION */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateExpense")}
      >
        <FontAwesome5 name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  iconBtn: {
    width: 40,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },

  summary: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#64748b",
  },

  summaryAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },

  trendBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },

  trendText: {
    color: "#10b981",
    fontWeight: "700",
    fontSize: 12,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#0f172a",
  },

  amount: {
    fontWeight: "700",
    fontSize: 14,
    color: "#0f172a",
  },

  date: {
    fontSize: 12,
    color: "#64748b",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  actionBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },

  pageText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },

  pageActive: {
    backgroundColor: "#1193d4",
  },

  pageActiveText: {
    color: "#fff",
    fontWeight: "700",
  },

  dots: {
    color: "#94a3b8",
    fontSize: 14,
  },

  listContent: {
    paddingBottom: 140, // space for pagination + FAB
  },
  paginationFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 100, // 👈 ABOVE pagination
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1193d4",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
