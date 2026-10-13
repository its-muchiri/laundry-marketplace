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
import { RiderOrder, OrderStatus } from "@laundry/shared";
import { useJobs } from "../context/JobContext";

const formatPrice = (cents: number) => `KES ${(cents / 100).toFixed(2)}`;
const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "completed":
      return "#16a34a";
    case "cancelled":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

const getStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    completed: "Completed",
    cancelled: "Cancelled",
    assigned: "Assigned",
    pickup_enroute: "En Route Pickup",
    pickup_arrived: "At Pickup",
    pickup_completed: "Pickup Done",
    return_enroute: "En Route Return",
    return_arrived: "At Return",
  };
  return labels[status] || status;
};

export default function JobHistoryScreen() {
  const { jobHistory, isLoading, fetchJobHistory } = useJobs();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobHistory();
    setRefreshing(false);
  };

  const renderJob = ({ item }: { item: RiderOrder }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View>
          <Text style={styles.jobProviderName}>
            {item.provider?.name || "Provider"}
          </Text>
          <Text style={styles.jobDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>
      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color="#16a34a" />
          <Text style={styles.detailText}>
            {formatPrice(item.riderEarningsCents || 0)} earned
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="scale" size={16} color="#8b5cf6" />
          <Text style={styles.detailText}>
            {item.actualWeightKg || item.estimatedWeightKg || 0} kg
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="locate" size={16} color="#3b82f6" />
          <Text style={styles.detailText}>
            {item.totalDistanceMeters
              ? `${(item.totalDistanceMeters / 1000).toFixed(1)} km`
              : "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {item.pickupCompletedAt && item.returnCompletedAt
              ? `${Math.round((new Date(item.returnCompletedAt).getTime() - new Date(item.pickupCompletedAt).getTime()) / 3600000)}h`
              : "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && jobHistory.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={styles.loadingText}>Loading history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobHistory}
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
            <Ionicons name="time-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No job history</Text>
            <Text style={styles.emptySubtitle}>
              Completed jobs will appear here
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
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobProviderName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  jobDate: { fontSize: 13, color: "#9ca3af", marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  jobDetails: { gap: 8 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  detailText: { fontSize: 13, color: "#374151" },
});
