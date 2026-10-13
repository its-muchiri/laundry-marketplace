import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RiderOrder } from "@laundry/shared";
import { useJobs } from "../context/JobContext";

const formatPrice = (cents: number) => `KES ${(cents / 100).toFixed(2)}`;
const formatDistance = (meters: number) => `${(meters / 1000).toFixed(1)} km`;

export default function AvailableJobsScreen({ navigation }: any) {
  const { availableJobs, isLoading, fetchAvailableJobs } = useJobs();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAvailableJobs();
    setRefreshing(false);
  };

  const renderJob = ({ item }: { item: RiderOrder }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() =>
        navigation.navigate("ActiveJob", { jobId: item.id, preview: true })
      }
    >
      <View style={styles.jobCardHeader}>
        <View style={styles.jobProviderInfo}>
          <Text style={styles.jobProviderName}>
            {item.provider?.name || "Provider"}
          </Text>
          <Text style={styles.jobServiceType}>
            {item.serviceType || "Wash & Fold"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
      </View>
      <View style={styles.jobCardDetails}>
        <View style={styles.jobDetailRow}>
          <Ionicons name="locate" size={16} color="#6b7280" />
          <Text style={styles.jobDetailText}>
            {formatDistance(item.totalDistanceMeters || 0)} away
          </Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Ionicons name="scale" size={16} color="#6b7280" />
          <Text style={styles.jobDetailText}>
            {item.estimatedWeightKg || 0} kg estimated
          </Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Ionicons name="cash" size={16} color="#6b7280" />
          <Text style={styles.jobDetailText}>
            {formatPrice(item.totalAmountCents || 0)} total
          </Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Ionicons name="timer" size={16} color="#6b7280" />
          <Text style={styles.jobDetailText}>
            {item.pickupWindowStart} - {item.pickupWindowEnd}
          </Text>
        </View>
      </View>
      <View style={styles.jobCardFooter}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerEarnings}>
            {formatPrice(item.riderEarningsCents || 0)}
          </Text>
          <Text style={styles.footerEarningsLabel}>Your earnings</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Job</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && availableJobs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={styles.loadingText}>Loading available jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={availableJobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#16a34a"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="briefcase-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No jobs available</Text>
            <Text style={styles.emptySubtitle}>
              Pull to refresh or wait for new orders
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  listContent: { padding: 16, gap: 12, paddingBottom: 100 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#6b7280", fontSize: 16 },
  emptyState: { padding: 40, alignItems: "center" },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
  },
  emptySubtitle: { fontSize: 14, color: "#9ca3af", marginTop: 4 },
  jobCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  jobCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobProviderInfo: { flex: 1 },
  jobProviderName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  jobServiceType: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  jobCardDetails: { gap: 8, marginBottom: 12 },
  jobDetailRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  jobDetailText: { fontSize: 13, color: "#374151" },
  jobCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
  },
  footerLeft: { flexDirection: "column" },
  footerEarnings: { fontSize: 20, fontWeight: "700", color: "#16a34a" },
  footerEarningsLabel: {
    fontSize: 11,
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  viewButton: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewButtonText: { color: "#374151", fontWeight: "600", fontSize: 14 },
});
