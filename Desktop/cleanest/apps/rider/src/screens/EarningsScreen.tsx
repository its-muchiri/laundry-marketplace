import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const formatPrice = (cents: number) => `KES ${(cents / 100).toLocaleString()}`;

const mockEarnings = {
  today: 245000,
  thisWeek: 1850000,
  thisMonth: 7200000,
  pending: 450000,
  totalJobs: 142,
  completionRate: 98,
  avgRating: 4.8,
};

export default function EarningsScreen() {
  const { user } = useAuth();

  const periodTabs = ["Today", "Week", "Month", "All Time"];
  const [selectedPeriod, setSelectedPeriod] = React.useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            {formatPrice(
              mockEarnings.today +
                mockEarnings.thisWeek +
                mockEarnings.thisMonth,
            )}
          </Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pendingCard}>
          <Text style={styles.pendingLabel}>Pending Payout</Text>
          <Text style={styles.pendingAmount}>
            {formatPrice(mockEarnings.pending)}
          </Text>
          <Text style={styles.pendingNote}>
            Released after 24h dispute window
          </Text>
        </View>
      </View>

      <View style={styles.periodTabs}>
        {periodTabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.periodTab,
              selectedPeriod === index && styles.periodTabActive,
            ]}
            onPress={() => setSelectedPeriod(index)}
          >
            <Text
              style={[
                styles.periodTabText,
                selectedPeriod === index && styles.periodTabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="briefcase" size={28} color="#16a34a" />
          <Text style={styles.statValue}>{mockEarnings.totalJobs}</Text>
          <Text style={styles.statLabel}>Total Jobs</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={28} color="#10b981" />
          <Text style={styles.statValue}>{mockEarnings.completionRate}%</Text>
          <Text style={styles.statLabel}>Completion Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={28} color="#f59e0b" />
          <Text style={styles.statValue}>{mockEarnings.avgRating}</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="timer" size={28} color="#3b82f6" />
          <Text style={styles.statValue}>2.3h</Text>
          <Text style={styles.statLabel}>Avg/Job</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
        <View style={styles.breakdownList}>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownInfo}>
              <Text style={styles.breakdownLabel}>Base Earnings</Text>
              <Text style={styles.breakdownSub}>From completed deliveries</Text>
            </View>
            <Text style={styles.breakdownAmount}>+{formatPrice(6800000)}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownInfo}>
              <Text style={styles.breakdownLabel}>Peak Hour Bonus</Text>
              <Text style={styles.breakdownSub}>KES 50/km during peak</Text>
            </View>
            <Text style={styles.breakdownAmount}>+{formatPrice(400000)}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownInfo}>
              <Text style={styles.breakdownLabel}>Distance Bonus</Text>
              <Text style={styles.breakdownSub}>KES 50/km over 5km</Text>
            </View>
            <Text style={styles.breakdownAmount}>+{formatPrice(350000)}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownInfo}>
              <Text style={styles.breakdownLabel}>Platform Fee</Text>
              <Text style={styles.breakdownSub}>15% commission</Text>
            </View>
            <Text style={[styles.breakdownAmount, styles.breakdownNegative]}>
              -{formatPrice(1200000)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Payouts</Text>
        <View style={styles.payoutList}>
          {[
            {
              date: "2024-01-15",
              amount: 850000,
              status: "completed",
              ref: "MPESA-B2C-001",
            },
            {
              date: "2024-01-08",
              amount: 920000,
              status: "completed",
              ref: "MPESA-B2C-002",
            },
            {
              date: "2024-01-01",
              amount: 780000,
              status: "completed",
              ref: "MPESA-B2C-003",
            },
          ].map((payout, index) => (
            <View key={index} style={styles.payoutItem}>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutDate}>
                  {new Date(payout.date).toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "short",
                  })}
                </Text>
                <Text style={styles.payoutRef}>{payout.ref}</Text>
              </View>
              <View style={styles.payoutAmount}>
                <Text style={styles.payoutAmountText}>
                  +{formatPrice(payout.amount)}
                </Text>
                <View
                  style={[
                    styles.payoutStatus,
                    {
                      backgroundColor:
                        payout.status === "completed" ? "#16a34a" : "#f59e0b",
                    },
                  ]}
                >
                  <Text style={styles.payoutStatusText}>{payout.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { paddingBottom: 100 },
  header: { padding: 16, gap: 12 },
  balanceCard: { backgroundColor: "#16a34a", borderRadius: 16, padding: 24 },
  balanceLabel: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
  balanceAmount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: "flex-start",
  },
  withdrawText: { color: "#fff", fontWeight: "600" },
  pendingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pendingLabel: { color: "#6b7280", fontSize: 13 },
  pendingAmount: {
    color: "#f59e0b",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },
  pendingNote: { color: "#9ca3af", fontSize: 11, marginTop: 2 },
  periodTabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  periodTab: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  periodTabActive: { backgroundColor: "#16a34a", borderColor: "#16a34a" },
  periodTabText: { color: "#374151", fontWeight: "500", fontSize: 13 },
  periodTabTextActive: { color: "#fff" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  breakdownList: { gap: 12 },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  breakdownInfo: { flex: 1 },
  breakdownLabel: { fontSize: 14, fontWeight: "500", color: "#111827" },
  breakdownSub: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
  breakdownAmount: { fontSize: 14, fontWeight: "600", color: "#16a34a" },
  breakdownNegative: { color: "#ef4444" },
  payoutList: { gap: 12 },
  payoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  payoutInfo: { flex: 1 },
  payoutDate: { fontSize: 14, fontWeight: "500", color: "#111827" },
  payoutRef: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
    fontFamily: "monospace",
  },
  payoutAmount: { alignItems: "flex-end" },
  payoutAmountText: { fontSize: 14, fontWeight: "600", color: "#16a34a" },
  payoutStatus: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  payoutStatusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
