import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const CARD = "#fff";
const SUBTLE = "#64748b";

export default function CustomerListScreen() {
  const navigation = useNavigation();

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
  const subscription = DeviceEventEmitter.addListener(
    "customerCreated",
    async () => {
      // console.log("🔥 customerCreated event received");

      await fetchCustomers();

      setCurrentPage(1);
    }
  );

  return () => {
    subscription.remove();
  };
}, []);
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://10.189.46.215:8000/customers");
      const data = await response.json();

      const sortedCustomers = data.sort((a, b) => b._id.localeCompare(a._id));

      setCustomers(sortedCustomers);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(
        `http://10.189.46.215:8000/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Customer deleted successfully");

        // Refresh list
        fetchCustomers();

        // OR update state directly:
        // setCustomers(prev => prev.filter(item => item._id !== id));
      } else {
        Alert.alert("Error", "Failed to delete customer");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const pagedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <View style={styles.safeContainer}>
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
      <ScrollView contentContainerStyle={{ paddingBottom: 180, marginTop: 10 }}>
        {pagedCustomers.map((item) => (
          <View key={item._id} style={styles.card}>
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
                  <Text style={styles.id}>{item.phoneNumber}</Text>
                  <Text style={styles.id}>{item.companyName}</Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => navigation.navigate("CreateCustomer")}
                >
                  <FontAwesome5 name="edit" size={18} color={SUBTLE} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() =>
                    Alert.alert("Delete Customer", `Delete ${item.name}?`, [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteCustomer(item._id),
                      },
                    ])
                  }
                >
                  <FontAwesome5 name="trash" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            {/* STATS */}
            <View style={styles.statsRow}>
              <Info label="AREA" value={item.area} />
              <Info label="DISTRICT" value={item.district} />
              <Info label="AVOID" value={item.avoidPoint} />
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
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateCustomer")}
      >
        <FontAwesome5 name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
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
