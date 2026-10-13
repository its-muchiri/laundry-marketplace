import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useJobs } from "../context/JobContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RiderOrder, RiderOrderLeg, OrderStatus } from "@laundry/shared";
import * as ImagePicker from "expo-image-picker";

const formatPrice = (cents: number) => `KES ${(cents / 100).toFixed(2)}`;
const formatDistance = (meters: number) => `${(meters / 1000).toFixed(1)} km`;

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
    assigned: "Assigned - Navigate to Pickup",
    pickup_enroute: "En Route to Pickup",
    pickup_arrived: "At Pickup Location",
    pickup_completed: "Pickup Completed - Navigate to Return",
    return_enroute: "En Route to Return",
    return_arrived: "At Return Location",
    completed: "Job Completed",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
};

const getLegStatus = (
  job: RiderOrder,
  legType: "pickup" | "return",
): string => {
  const leg = (job.legs || []).find((l) => l.legType === legType);
  return leg?.status || "pending";
};

export default function ActiveJobScreen() {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const {
    currentJob,
    acceptJob,
    startLeg,
    completeLeg,
    fetchAvailableJobs,
    fetchJobHistory,
  } = useJobs();
  const [job, setJob] = useState<RiderOrder | null>(currentJob);
  const [previewJob, setPreviewJob] = useState<RiderOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeLeg, setActiveLeg] = useState<"pickup" | "return">("pickup");

  const { jobId, preview } = (route.params || {}) as {
    jobId?: string;
    preview?: boolean;
  };

  useEffect(() => {
    if (jobId && !job) {
      // In real app, fetch job details from API
      setPreviewJob({ id: jobId } as RiderOrder);
    }
  }, [jobId]);

  useEffect(() => {
    if (job) {
      const pickupLeg = (job.legs || []).find((l) => l.legType === "pickup");
      const returnLeg = (job.legs || []).find((l) => l.legType === "return");

      if (pickupLeg && pickupLeg.status !== "completed") {
        setActiveLeg("pickup");
      } else if (returnLeg && returnLeg.status !== "completed") {
        setActiveLeg("return");
      }
    }
  }, [job]);

  const handleAccept = async () => {
    if (!jobId) return;
    setIsLoading(true);
    try {
      await acceptJob(jobId);
      await fetchAvailableJobs();
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to accept job");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartLeg = async (leg: RiderOrderLeg) => {
    setIsLoading(true);
    try {
      await startLeg(leg.id);
      // Refresh job
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to start leg");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteLeg = async (leg: RiderOrderLeg) => {
    if (photos.length === 0) {
      Alert.alert("Required", "Please add at least one photo");
      return;
    }
    if (!itemCount) {
      Alert.alert("Required", "Please enter item count");
      return;
    }
    setShowConfirm(true);
  };

  const confirmComplete = async (leg: RiderOrderLeg) => {
    setIsLoading(true);
    try {
      await completeLeg(leg.id, photos, parseInt(itemCount));
      await fetchAvailableJobs();
      await fetchJobHistory();
      navigation.navigate("RiderTabs", { screen: "Home" });
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to complete leg");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  if (!job && !previewJob) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={styles.loadingText}>Loading job...</Text>
      </View>
    );
  }

  const activeJob = job || previewJob!;
  const currentLeg = (activeJob.legs || []).find(
    (l) => l.legType === activeLeg,
  );
  const legStatus = currentLeg?.status || "pending";

  const canStartLeg = legStatus === "assigned" || legStatus === "pending";
  const canCompleteLeg = legStatus === "in_progress";
  const isLegCompleted = legStatus === "completed";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Job Header */}
        <View style={styles.jobHeader}>
          <View style={styles.jobHeaderTop}>
            <View>
              <Text style={styles.jobProviderName}>
                {activeJob.provider?.name || "Provider"}
              </Text>
              <Text style={styles.jobServiceType}>
                {activeJob.serviceType || "Wash & Fold"}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(activeJob.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusLabel(activeJob.status)}
              </Text>
            </View>
          </View>

          <View style={styles.jobMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="cash" size={20} color="#16a34a" />
              <Text style={styles.metaValue}>
                {formatPrice(activeJob.riderEarningsCents || 0)}
              </Text>
              <Text style={styles.metaLabel}>Your Earnings</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="locate" size={20} color="#3b82f6" />
              <Text style={styles.metaValue}>
                {formatDistance(activeJob.totalDistanceMeters || 0)}
              </Text>
              <Text style={styles.metaLabel}>Total Distance</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="scale" size={20} color="#8b5cf6" />
              <Text style={styles.metaValue}>
                {activeJob.estimatedWeightKg || 0} kg
              </Text>
              <Text style={styles.metaLabel}>Est. Weight</Text>
            </View>
          </View>
        </View>

        {/* Legs Progress */}
        <View style={styles.legsSection}>
          <Text style={styles.sectionTitle}>Job Progress</Text>
          <View style={styles.legsTracker}>
            {["pickup", "return"].map((legType, index) => {
              const leg = (activeJob.legs || []).find(
                (l) => l.legType === legType,
              );
              const status = leg?.status || "pending";
              const isCurrent = legType === activeLeg && !isLegCompleted;
              const isCompleted = status === "completed";

              return (
                <View key={legType} style={styles.legItem}>
                  <View style={styles.legConnector} />
                  <View
                    style={[
                      styles.legCircle,
                      isCurrent && styles.legCircleActive,
                      isCompleted && styles.legCircleCompleted,
                    ]}
                  >
                    {isCompleted ? (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    ) : (
                      <Text style={styles.legNumber}>{index + 1}</Text>
                    )}
                  </View>
                  <View style={styles.legInfo}>
                    <Text
                      style={[
                        styles.legTitle,
                        isCurrent && styles.legTitleActive,
                        isCompleted && styles.legTitleCompleted,
                      ]}
                    >
                      {legType === "pickup" ? "Pickup" : "Return"}
                    </Text>
                    <Text
                      style={[
                        styles.legStatus,
                        isCurrent && styles.legStatusActive,
                      ]}
                    >
                      {isCompleted ? "Completed" : status}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Current Leg Actions */}
        {currentLeg && !isLegCompleted && (
          <View style={styles.actionSection}>
            <Text style={styles.sectionTitle}>
              {activeLeg === "pickup" ? "📍 Pickup Leg" : "📦 Return Leg"}
            </Text>

            <View style={styles.legDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address:</Text>
                <Text style={styles.detailValue}>
                  {activeLeg === "pickup"
                    ? activeJob.pickupAddress
                    : activeJob.dropoffAddress}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Contact:</Text>
                <Text style={styles.detailValue}>
                  {activeJob.customerPhone}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Window:</Text>
                <Text style={styles.detailValue}>
                  {activeLeg === "pickup"
                    ? `${activeJob.pickupWindowStart} - ${activeJob.pickupWindowEnd}`
                    : `${activeJob.dropoffWindowStart} - ${activeJob.dropoffWindowEnd}`}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Items:</Text>
                <Text style={styles.detailValue}>
                  {activeLeg === "pickup"
                    ? "Unknown (estimate)"
                    : itemCount || "To be counted"}
                </Text>
              </View>
            </View>

            {canStartLeg && (
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={() => handleStartLeg(currentLeg)}
                disabled={isLoading}
              >
                <Text style={styles.primaryButtonText}>
                  {isLoading
                    ? "Starting..."
                    : `Start ${activeLeg === "pickup" ? "Pickup" : "Return"} Leg`}
                </Text>
              </TouchableOpacity>
            )}

            {canCompleteLeg && (
              <View style={styles.completeSection}>
                <Text style={styles.completeTitle}>Complete Leg</Text>

                <View style={styles.photoSection}>
                  <Text style={styles.photoLabel}>Photos (required)</Text>
                  <View style={styles.photoGrid}>
                    {photos.map((uri, index) => (
                      <View key={index} style={styles.photoItem}>
                        <Image source={{ uri }} style={styles.photoThumbnail} />
                        <TouchableOpacity
                          style={styles.photoDelete}
                          onPress={() =>
                            setPhotos((p) => p.filter((_, i) => i !== index))
                          }
                        >
                          <Ionicons name="close" size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={styles.addPhotoButton}
                      onPress={pickImages}
                    >
                      <Ionicons name="image" size={28} color="#6b7280" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addPhotoButton}
                      onPress={takePhoto}
                    >
                      <Ionicons name="camera" size={28} color="#6b7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.itemCountInput}>
                  <Text style={styles.inputLabel}>Item Count *</Text>
                  <TextInput
                    style={styles.input}
                    value={itemCount}
                    onChangeText={setItemCount}
                    placeholder="Enter number of items"
                    keyboardType="numeric"
                    editable={!isLoading}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    styles.completeButton,
                    isLoading && styles.buttonDisabled,
                  ]}
                  onPress={() => handleCompleteLeg(currentLeg)}
                  disabled={isLoading || photos.length === 0 || !itemCount}
                >
                  <Text style={styles.primaryButtonText}>
                    {isLoading
                      ? "Completing..."
                      : `Complete ${activeLeg === "pickup" ? "Pickup" : "Return"}`}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {isLegCompleted && (
              <View style={styles.completedMessage}>
                <Ionicons name="checkmark-circle" size={48} color="#16a34a" />
                <Text style={styles.completedText}>
                  {activeLeg === "pickup"
                    ? "Pickup completed!"
                    : "Return completed!"}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Preview mode - Accept button */}
        {preview && !job && (
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
              onPress={handleAccept}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading ? "Accepting..." : "Accept Job"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Customer Info */}
        <View style={styles.customerSection}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.customerInfo}>
            <View style={styles.customerRow}>
              <Ionicons name="person" size={20} color="#6b7280" />
              <Text style={styles.customerName}>{activeJob.customerName}</Text>
            </View>
            <View style={styles.customerRow}>
              <Ionicons name="call" size={20} color="#6b7280" />
              <Text style={styles.customerPhone}>
                {activeJob.customerPhone}
              </Text>
            </View>
            <View style={styles.customerRow}>
              <Ionicons name="location" size={20} color="#6b7280" />
              <Text style={styles.customerAddress}>
                {activeJob.pickupAddress}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {showConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Complete Leg?</Text>
            <Text style={styles.modalText}>
              Confirm you have collected/delivered all items and taken required
              photos.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={() => confirmComplete(currentLeg!)}
              >
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { paddingBottom: 100 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#6b7280", fontSize: 16 },
  jobHeader: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  jobHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  jobProviderName: { fontSize: 20, fontWeight: "700", color: "#111827" },
  jobServiceType: { fontSize: 14, color: "#6b7280", marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  jobMeta: { flexDirection: "row", justifyContent: "space-around" },
  metaItem: { alignItems: "center", flex: 1 },
  metaValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  metaLabel: { fontSize: 11, color: "#9ca3af", textTransform: "uppercase" },
  metaDivider: { width: 1, height: 40, backgroundColor: "#e5e7eb" },
  legsSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  legsTracker: { gap: 16 },
  legItem: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  legConnector: {
    width: 2,
    flex: 1,
    backgroundColor: "#e5e7eb",
    marginTop: 24,
  },
  legCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  legCircleActive: { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
  legCircleCompleted: { backgroundColor: "#16a34a", borderColor: "#16a34a" },
  legNumber: { color: "#9ca3af", fontSize: 14, fontWeight: "600" },
  legInfo: { flex: 1, marginTop: 4 },
  legTitle: { fontSize: 14, fontWeight: "600", color: "#374151" },
  legTitleActive: { color: "#3b82f6" },
  legTitleCompleted: { color: "#16a34a" },
  legStatus: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
  legStatusActive: { color: "#3b82f6", fontWeight: "500" },
  actionSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  legDetails: { marginBottom: 16 },
  detailRow: { flexDirection: "row", marginBottom: 10 },
  detailLabel: { width: 80, fontSize: 14, color: "#6b7280", fontWeight: "500" },
  detailValue: { flex: 1, fontSize: 14, color: "#111827" },
  primaryButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  buttonDisabled: { opacity: 0.6 },
  completeSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  completeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  photoSection: { marginBottom: 16 },
  photoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  photoGrid: { flexDirection: "row", gap: 8 },
  photoItem: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
  },
  photoThumbnail: { width: "100%", height: "100%" },
  photoDelete: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  itemCountInput: { marginBottom: 16 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#111827",
  },
  completeButton: { backgroundColor: "#16a34a" },
  completedMessage: { alignItems: "center", paddingVertical: 20 },
  completedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#16a34a",
    marginTop: 8,
  },
  previewActions: { padding: 16, paddingTop: 0, gap: 12 },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: { color: "#374151", fontWeight: "600", fontSize: 16 },
  customerSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  customerInfo: { gap: 12 },
  customerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  customerName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  customerPhone: { fontSize: 14, color: "#374151" },
  customerAddress: { fontSize: 14, color: "#374151", flex: 1 },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButtons: { flexDirection: "row", gap: 12 },
  modalCancel: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCancelText: { color: "#374151", fontWeight: "600", fontSize: 16 },
  modalConfirm: {
    flex: 1,
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalConfirmText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
