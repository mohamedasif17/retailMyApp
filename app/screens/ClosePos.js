import { useNavigation } from "@react-navigation/native";
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

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const CARD = "#ffffff";
const TEXT = "#111618";
const SUBTLE = "#6b7280";

export default function ClosePOSScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color={TEXT} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Close POS</Text>

               <View style={{ width: 26 }} />
       
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
      

        {/* TOTAL CASH */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>TOTAL CLOSING CASH AMOUNT</Text>
          <Text style={styles.heroAmount}>$1,650.00</Text>

          <View style={styles.heroStatus}>
            <FontAwesome5 name="check-circle" size={14} color={PRIMARY} />
            <Text style={styles.heroStatusText}>Ready to reconcile</Text>
          </View>
        </View>

        {/* CASH MANAGEMENT */}
        <Section icon="money-bill-wave" title="Cash Management" color="#16a34a">
          <Row label="Opening Cash" value="$200.00" />
          <Row label="Cash Sales" value="$1,450.00" highlight />
        </Section>

        {/* DIGITAL PAYMENTS */}
        <Section icon="credit-card" title="Digital Payments" color="#3b82f6">
          <Row label="Card Sales" value="$3,200.00" />
          <Row label="Online Sales" value="$850.00" />
          <Row label="GPay Sales" value="$420.00" />
          <Row label="PhonePe Sales" value="$180.00" />
          <Row label="Amazon Pay Sales" value="$120.00" />
          <Row label="Total Non-Cash Amount" value="$4,770.00" strong footer />
        </Section>

        {/* SALES SUMMARY */}
        <Section icon="chart-line" title="Sales Summary" color="#f97316">
          <Row label="Total Receipt Amount" value="$6,320.00" />
          <Row label="Return Sales" value="-$100.00" danger />
          <Row label="Net Sales" value="$6,220.00" primary />
          <Row label="Total Sales" value="$6,220.00" />
        </Section>

        {/* RECONCILIATION */}
        <Section icon="balance-scale" title="Reconciliation" color="#8b5cf6">
          <Row label="Payments Received" value="+$6,220.00" success />
          <Row label="Unpaid Amount" value="$0.00" muted />
        </Section>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeBtn}>
          <FontAwesome5 name="lock" size={20} color="#fff" />
          <Text style={styles.closeText}>Close Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, icon, color, children }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <View style={styles.sectionHeader}>
        <FontAwesome5 name={icon} size={18} color={color} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <View style={styles.card}>{children}</View>
    </View>
  );
}

function Row({
  label,
  value,
  highlight,
  footer,
  strong,
  primary,
  danger,
  success,
  muted,
}) {
  return (
    <View
      style={[
        styles.row,
        highlight && styles.rowHighlight,
        footer && styles.rowFooter,
      ]}
    >
      <Text style={[styles.rowLabel, muted && { color: "#9ca3af" }]}>
        {label}
      </Text>

      <Text
        style={[
          styles.rowValue,
          strong && styles.strong,
          primary && { color: PRIMARY },
          danger && { color: "#ef4444" },
          success && { color: "#16a34a" },
          muted && { color: "#9ca3af" },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CARD,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT,
  },

  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  metaWrap: {
    alignItems: "center",
    marginVertical: 14,
  },

  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },

  metaText: {
    fontSize: 12,
    color: SUBTLE,
    fontWeight: "500",
  },

  hero: {
    backgroundColor: "#e8f4fb",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    marginTop:10
  },

  heroLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: PRIMARY,
    letterSpacing: 0.5,
  },

  heroAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: TEXT,
    marginVertical: 6,
  },

  heroStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  heroStatusText: {
    fontSize: 12,
    color: SUBTLE,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 16,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: TEXT,
  },

  card: {
    backgroundColor: CARD,
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },

  rowHighlight: {
    backgroundColor: "#f0fdf4",
  },

  rowFooter: {
    backgroundColor: "#f9fafb",
  },

  rowLabel: {
    fontSize: 14,
    color: SUBTLE,
  },

  rowValue: {
    fontSize: 14,
    color: TEXT,
    fontWeight: "500",
  },

  strong: {
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },

  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontWeight: "700",
    color: "#374151",
  },

  closeBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  closeText: {
    color: "#fff",
    fontWeight: "800",
  },
});
