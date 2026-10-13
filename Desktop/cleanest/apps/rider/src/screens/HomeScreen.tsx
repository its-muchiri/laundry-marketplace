import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RiderOrder, OrderStatus } from "@laundry/shared";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";

const formatPrice = (cents: number) => `KES ${(cents / 100).toFixed(2)}`;
const formatDistance = (meters: number) => `${(meters / 1000).toFixed(1)} km`;

export default function HomeScreen({ navigation }: any) {
  const {
    availableJobs,
    currentJob,
    isLoading,
    fetchAvailableJobs,
    startLocationTracking,
  } = useJobs();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAvailableJobs();
    setRefreshing(false);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "assigned":
        return "#f59e0b";
      case "pickup_enroute":
        return "#3b82f6";
      case "pickup_arrived":
        return "#8b5cf6";
      case "pickup_completed":
        return "#10b981";
      case "return_enroute":
        return "#3b82f6";
      case "return_arrived":
        return "#8b5cf6";
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
      assigned: "Assigned",
      pickup_enroute: "En Route to Pickup",
      pickup_arrived: "At Pickup",
      pickup_completed: "Pickup Done",
      return_enroute: "En Route to Return",
      return_arrived: "At Return",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return labels[status] || status;
  };

  if (!user) return null;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#16a34a"]}
        />
      }
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Good morning,</Text>
          <Text style={styles.nameText}>{user.firstName} 👋</Text>
        </View>
        <View style={styles.statusBadge}>
          <TouchableOpacity
            onPress={startLocationTracking}
            style={styles.trackButton}
          >
            <Ionicons name="location" size={20} color="#16a34a" />
            <Text style={styles.trackText}>Go Online</Text>
          </TouchableOpacity>
        </View>
      </View>

      {currentJob && (
        <View style={styles.currentJobCard}>
          <View style={styles.currentJobHeader}>
            <Text style={styles.currentJobTitle}>Active Job</Text>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(currentJob.status) },
              ]}
            />
          </View>
          <Text style={styles.currentJobProvider}>
            {currentJob.provider?.name || "Provider"}
          </Text>
          <View style={styles.currentJobDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="locate" size={18} color="#6b7280" />
              <Text style={styles.detailText}>
                {formatDistance(currentJob.totalDistanceMeters || 0)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="cash" size={18} color="#6b7280" />
              <Text style={styles.detailText}>
                {formatPrice(currentJob.totalAmountCents || 0)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={18} color="#6b7280" />
              <Text style={styles.detailText}>
                {getStatusLabel(currentJob.status)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("ActiveJob")}
          >
            <Text style={styles.continueButtonText}>Continue Job</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Jobs</Text>
        <Text style={styles.sectionSubtitle}>
          {availableJobs.length} nearby
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
      ) : availableJobs.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="briefcase-outline" size={64} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No jobs available</Text>
          <Text style={styles.emptySubtitle}>
            Pull to refresh or wait for new orders
          </Text>
        </View>
      ) : (
        <View style={styles.jobsList}>
          {availableJobs.map((job: RiderOrder) => (
            <TouchableOpacity
              key={job.id}
              style={styles.jobCard}
              onPress={() =>
                navigation.navigate("ActiveJob", {
                  jobId: job.id,
                  preview: true,
                })
              }
            >
              <View style={styles.jobCardHeader}>
                <View style={styles.jobProviderInfo}>
                  <Text style={styles.jobProviderName}>
                    {job.provider?.name || "Provider"}
                  </Text>
                  <Text style={styles.jobServiceType}>
                    {job.serviceType || "Wash & Fold"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.jobStatusBadge,
                    { backgroundColor: getStatusColor(job.status) },
                  ]}
                >
                  <Text style={styles.jobStatusText}>
                    {getStatusLabel(job.status)}
                  </Text>
                </View>
              </View>
              <View style={styles.jobCardDetails}>
                <View style={styles.jobDetailRow}>
                  <Ionicons name="locate" size={16} color="#6b7280" />
                  <Text style={styles.jobDetailText}>
                    {formatDistance(job.totalDistanceMeters || 0)} away
                  </Text>
                </View>
                <View style={styles.jobDetailRow}>
                  <Ionicons name="scale" size={16} color="#6b7280" />
                  <Text style={styles.jobDetailText}>
                    {job.estimatedWeightKg || 0} kg estimated
                  </Text>
                </View>
                <View style={styles.jobDetailRow}>
                  <Ionicons name="cash" size={16} color="#6b7280" />
                  <Text style={styles.jobDetailText}>
                    {formatPrice(job.totalAmountCents || 0)} total
                  </Text>
                </View>
                <View style={styles.jobDetailRow}>
                  <Ionicons name="timer" size={16} color="#6b7280" />
                  <Text style={styles.jobDetailText}>
                    {job.pickupWindowStart} - {job.pickupWindowEnd}
                  </Text>
                </View>
              </View>
              <View style={styles.jobCardFooter}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() =>
                    navigation.navigate("ActiveJob", {
                      jobId: job.id,
                      preview: true,
                    })
                  }
                >
                  <Text style={styles.acceptButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 10,
  },
  greeting: { flex: 1 },
  greetingText: { fontSize: 16, color: "#6b7280" },
  nameText: { fontSize: 28, fontWeight: "700", color: "#111827", marginTop: 2 },
  statusBadge: { alignItems: "flex-end" },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  trackText: { color: "#16a34a", fontWeight: "600", fontSize: 14 },
  currentJobCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#16a34a",
    shadowColor: "#16a34a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentJobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  currentJobTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  currentJobProvider: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  currentJobDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  detailItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailText: { fontSize: 13, color: "#374151", fontWeight: "500" },
  continueButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  sectionSubtitle: { fontSize: 14, color: "#6b7280" },
  loadingContainer: { padding: 40, alignItems: "center" },
  loadingText: { color: "#6b7280", fontSize: 16 },
  emptyState: { padding: 40, alignItems: "center" },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
  },
  emptySubtitle: { fontSize: 14, color: "#9ca3af", marginTop: 4 },
  jobsList: { paddingHorizontal: 16, gap: 12 },
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
  jobStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  jobStatusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  jobCardDetails: { gap: 8, marginBottom: 12 },
  jobDetailRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  jobDetailText: { fontSize: 13, color: "#374151" },
  jobCardFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
  },
  acceptButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
