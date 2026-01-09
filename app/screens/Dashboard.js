import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const CARD = "#ffffff";
const BORDER = "#e2e8f0";
const SUBTLE = "#64748b";

export default function DashboardScreen() {
      const navigation = useNavigation();
    
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Overview</Text>
                <View style={{ width: 26 }} />
        
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* METRICS */}
        <View style={styles.grid}>
          <Metric
            icon="shopping-cart"
            label="Sales"
            value="142"
            trend="+12%"
            color={PRIMARY}
          />
          <Metric
            icon="shopping-bag"
            label="Purchases"
            value="24"
            trend="+5%"
            color="#f97316"
          />
          <Metric
            icon="users"
            label="Customers"
            value="1,050"
            trend="+2%"
            color="#9333ea"
          />
          <Metric
            icon="boxes"
            label="Products"
            value="340"
            trend="0%"
            color="#3b82f6"
            neutral
          />
        </View>

        {/* REVENUE CARD */}
        <View style={styles.revenueCard}>
          <View style={styles.revenueHeader}>
            <View>
              <Text style={styles.revenueTitle}>Revenue Trend</Text>
              <Text style={styles.revenueSub}>Monthly Revenue (2024)</Text>
            </View>
            <FontAwesome5 name="ellipsis-h" size={16} color={SUBTLE} />
          </View>

          <View style={styles.revenueAmount}>
            <Text style={styles.amount}>$124,500</Text>
            <View style={styles.growth}>
              <FontAwesome5 name="arrow-up" size={12} />
              <Text style={styles.growthText}>8.2%</Text>
            </View>
          </View>

          {/* CHART */}
          <View style={{ height: 180 }}>
            <Svg width="100%" height="100%" viewBox="0 0 478 150">
              <Defs>
                <LinearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={PRIMARY} stopOpacity="0.2" />
                  <Stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
                </LinearGradient>
              </Defs>

              <Path
                d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25V150H0Z"
                fill="url(#g)"
              />
              <Path
                d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25"
                stroke={PRIMARY}
                strokeWidth={3}
                fill="none"
              />
            </Svg>
          </View>

          {/* X AXIS */}
          <View style={styles.axis}>
            {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
              <Text key={m} style={styles.axisText}>
                {m}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* METRIC CARD */
const Metric = ({ icon, label, value, trend, color, neutral }) => (
  <View style={styles.metric}>
    <View style={styles.metricTop}>
      <View style={[styles.metricIcon, { backgroundColor: color + "20" }]}>
        <FontAwesome5 name={icon} size={18} color={color} />
      </View>
      <View style={[styles.trend, neutral && { backgroundColor: "#e5e7eb" }]}>
        <Text style={[styles.trendText, neutral && { color: SUBTLE }]}>
          {trend}
        </Text>
      </View>
    </View>

    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    height: 56,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  headerTitle: { fontSize: 18, fontWeight: "800" },

  filterBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },
  filterText: { fontWeight: "600", color: SUBTLE },

  container: { padding: 16, paddingBottom: 120 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  metric: {
    width: "48%",
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
  },

  metricTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  trend: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: { fontSize: 11, fontWeight: "700", color: "#16a34a" },

  metricLabel: { fontSize: 13, color: SUBTLE },
  metricValue: { fontSize: 22, fontWeight: "800", marginTop: 2 },

  revenueCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: 20,
  },

  revenueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  revenueTitle: { fontSize: 17, fontWeight: "800" },
  revenueSub: { fontSize: 11, color: SUBTLE, marginTop: 2 },

  revenueAmount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  amount: { fontSize: 26, fontWeight: "800" },

  growth: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  growthText: { fontWeight: "700", color: "#16a34a" },

  axis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  axisText: { fontSize: 11, color: SUBTLE },
});
