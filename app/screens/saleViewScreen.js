import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function SaleDetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
<FontAwesome5 name="chevron-left" size={18} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sale #12345</Text>

        <View style={styles.headerActions}>
<FontAwesome5 name="ellipsis-v" size={20} color="#111" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CUSTOMER CARD */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.customerName}>John Doe</Text>
         <View style={{ flexDirection: "row", alignItems: "center" }}>
  <FontAwesome5 name="map-marker-alt" size={14} color="#111" />
  <Text style={{ marginLeft: 8, fontSize: 14, color: "#111" }}>
    Downtown Branch
  </Text>
</View>

              <Text style={styles.subTextSmall}>Customer ID: 98765</Text>
            </View>

            <View style={styles.paidChip}>
<FontAwesome5 name="check-circle" size={14} color="#16a34a" solid />
              <Text style={styles.paidText}>PAID</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.noteLabel}>Notes</Text>
          <Text style={styles.noteText}>
            Customer requested fragile packaging and preferred morning delivery.
          </Text>
        </View>

        {/* PRODUCT DETAILS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.itemCount}>3 Items</Text>
        </View>

        {products.map((item, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.subTextSmall}>SKU: {item.sku}</Text>
              </View>
              <Text style={styles.productPrice}>₹{item.total}</Text>
            </View>

            <View style={styles.productMeta}>
              <Text>Price: ₹{item.price}</Text>
              <Text>Tax: ₹{item.tax}</Text>
              <Text>Qty: {item.qty}</Text>
              <Text style={{ color: "red" }}>Disc: ₹{item.discount}</Text>
            </View>
          </View>
        ))}

        {/* SUMMARY */}
        <View style={styles.summaryCard}>
          {summaryRow("Subtotal", "₹108.00")}
          {summaryRow("Tax", "₹8.72")}
          {summaryRow("Discount", "-₹5.00", true)}
          {summaryRow("Shipping", "₹10.00")}

          <View style={styles.summaryTotal}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹121.72</Text>
          </View>
        </View>

        {/* TIMELINE */}
        <Text style={styles.sectionTitle}>Sale Status Timeline</Text>

        <View style={styles.timelineCard}>
          <TimelineItem
            icon="truck"
            title="Shipped"
            subtitle="Today 02:30 PM • Alex Smith"
            color="#1193d4"
          />
          <TimelineItem
            icon="credit-card"
            title="Payment Confirmed"
            subtitle="Today 10:45 AM • System"
            color="#16a34a"
          />
          <TimelineItem
            icon="plus"
            title="Sale Created"
            subtitle="Today 10:30 AM • Cashier Sarah"
            color="#9ca3af"
          />
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.invoiceBtn}>
          <Text style={styles.invoiceText}>Generate Invoice PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- HELPERS ---------------- */

const products = [
  {
    name: "iPhone 15 Case",
    sku: "APP-I15-C",
    price: 50,
    tax: 4,
    qty: 1,
    discount: 5,
    total: 49,
  },
  {
    name: "USB-C Cable",
    sku: "USB-C-2M",
    price: 29,
    tax: 2.32,
    qty: 1,
    discount: 0,
    total: 29,
  },
  {
    name: "Screen Protector",
    sku: "SCR-GLS",
    price: 15,
    tax: 2.4,
    qty: 2,
    discount: 0,
    total: 30,
  },
];

const summaryRow = (label, value, danger = false) => (
  <View style={styles.rowBetween}>
    <Text style={styles.subText}>{label}</Text>
    <Text style={[styles.subText, danger && { color: "red" }]}>{value}</Text>
  </View>
);

const TimelineItem = ({ icon, title, subtitle, color }) => (
  <View style={styles.timelineItem}>
    <View style={[styles.timelineIcon, { backgroundColor: color }]}>
      <FontAwesome5 name={icon} size={12} color="#fff" />
    </View>
    <View>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.subTextSmall}>{subtitle}</Text>
    </View>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },

  scrollContent: {
    padding: 14,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  headerActions: {
    flexDirection: "row",
    gap: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  customerName: {
    fontSize: 18,
    fontWeight: "700",
  },

  subText: {
    color: "#617c89",
    fontSize: 13,
    
    
  },

  subTextSmall: {
    color: "#617c89",
    fontSize: 11,
  },

  paidChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  paidText: {
    color: "#16a34a",
    fontWeight: "700",
    marginLeft: 4,
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 10,
  },

  noteLabel: {
    fontWeight: "600",
    color: "#617c89",
  },

  noteText: {
    marginTop: 4,
    fontSize: 13,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 8,
  },

  itemCount: {
    backgroundColor: "#e0f2fe",
    color: "#1193d4",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
  },

  productCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  productName: {
    fontWeight: "600",
  },

  productPrice: {
    fontWeight: "700",
  },

  productMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    flexWrap: "wrap",
  },

  summaryCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1193d4",
    marginVertical: 12,
  },

  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },

  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1193d4",
  },

  timelineCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
  },

  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  timelineIcon: {
    height: 28,
    width: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  timelineTitle: {
    fontWeight: "600",
  },

  invoiceBtn: {
    backgroundColor: "#1193d4",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  invoiceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
