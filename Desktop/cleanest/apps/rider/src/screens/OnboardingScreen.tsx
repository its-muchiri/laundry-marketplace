import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to LaundryKE!",
    description:
      "You're now part of Kenya's fastest-growing laundry delivery network. Earn daily by picking up and delivering laundry orders.",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
    action: { label: "Get Started", action: "next" },
  },
  {
    id: 2,
    title: "How It Works",
    description:
      "1. Receive job offers nearby\n2. Accept within 30 seconds\n3. Navigate to pickup location\n4. Scan bag tag, take photo\n5. Deliver to customer\n6. Get paid instantly via M-Pesa",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    action: { label: "Next", action: "next" },
  },
  {
    id: 3,
    title: "Earnings & Payouts",
    description:
      "• Base fee per delivery leg\n• KES 50/km distance bonus\n• Peak hour surcharges\n• Daily M-Pesa payouts\n• 24h dispute window\n• No hidden fees",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    action: { label: "Next", action: "next" },
  },
  {
    id: 4,
    title: "Safety First",
    description:
      "• Verified riders only\n• Real-time GPS tracking\n• Emergency SOS button\n• Insurance coverage\n• 24/7 support line\n• Rating protection",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
    action: { label: "Next", action: "next" },
  },
  {
    id: 5,
    title: "Document Verification",
    description:
      "Upload your documents to get verified and start receiving jobs:\n• National ID / Passport\n• Driver's License\n• Vehicle Registration\n• Insurance Certificate\n• Profile Photo",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    action: { label: "Upload Documents", action: "documents" },
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [documents, setDocuments] = useState<Record<string, string>>({});

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleAction = () => {
    if (step.action.action === "next") {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } else if (step.action.action === "documents") {
      navigation.navigate("Documents");
    }
  };

  const handleSkip = () => {
    setCurrentStep(onboardingSteps.length - 1);
  };

  const handleComplete = () => {
    if (user) {
      updateUser({ ...user, onboardingCompleted: true });
    }
    navigation.reset({ index: 0, routes: [{ name: "RiderTabs" }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {onboardingSteps.map((s, index) => (
          <View key={s.id} style={styles.progressItem}>
            <View
              style={[
                styles.progressDot,
                index < currentStep && styles.progressDotCompleted,
                index === currentStep && styles.progressDotActive,
              ]}
            >
              {index < currentStep && (
                <Ionicons name="checkmark" size={12} color="#fff" />
              )}
            </View>
            {index < onboardingSteps.length - 1 && (
              <View
                style={[
                  styles.progressLine,
                  index < currentStep && styles.progressLineCompleted,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{ uri: step.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.stepNumber}>
            Step {step.id} of {onboardingSteps.length}
          </Text>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        {!isLastStep && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.primaryButton, isLastStep && { marginLeft: 0 }]}
          onPress={
            step.action.action === "documents" ? handleComplete : handleAction
          }
        >
          <Text style={styles.primaryButtonText}>
            {isLastStep ? "Start Earning" : step.action.label}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  progressContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  progressItem: { flex: 1, alignItems: "center" },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 1,
  },
  progressDotActive: { backgroundColor: "#16a34a", borderColor: "#16a34a" },
  progressDotCompleted: { backgroundColor: "#16a34a", borderColor: "#16a34a" },
  progressLine: {
    position: "absolute",
    left: "50%",
    right: "50%",
    top: 13,
    height: 2,
    backgroundColor: "#e5e7eb",
  },
  progressLineCompleted: { backgroundColor: "#16a34a" },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  image: { width: "100%", height: 280 },
  content: { padding: 24, paddingTop: 16 },
  stepNumber: {
    fontSize: 13,
    color: "#16a34a",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    lineHeight: 34,
  },
  description: { fontSize: 16, color: "#374151", lineHeight: 26 },
  bottomActions: {
    padding: 24,
    paddingTop: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: { paddingHorizontal: 16, paddingVertical: 10 },
  skipText: { fontSize: 15, color: "#9ca3af", fontWeight: "500" },
  primaryButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    marginLeft: 12,
  },
  primaryButtonWide: { marginLeft: 0 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
