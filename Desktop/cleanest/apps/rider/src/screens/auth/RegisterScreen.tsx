import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { UserRole } from "@laundry/shared";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "boda",
    licensePlate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const vehicleTypes: { value: string; label: string; icon: string }[] = [
    { value: "boda", label: "Boda Boda", icon: "bicycle" },
    { value: "car", label: "Car/Van", icon: "car" as any },
    { value: "tuktuk", label: "Tuk-tuk", icon: "bicycle" },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please fill all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to terms and conditions");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "rider" as UserRole,
        vehicleType: formData.vehicleType,
        licensePlate: formData.licensePlate || undefined,
      });
      navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
    } catch (e: any) {
      setError(e.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="bicycle" size={48} color="#fff" />
          </View>
          <Text style={styles.appName}>LaundryKE Rider</Text>
          <Text style={styles.tagline}>Join our delivery network</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Start earning as a laundry delivery rider
          </Text>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.nameRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John"
                value={formData.firstName}
                onChangeText={(v) => handleChange("firstName", v)}
                autoComplete="given-name"
                textContentType="givenName"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(v) => handleChange("lastName", v)}
                autoComplete="family-name"
                textContentType="familyName"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="john@example.com"
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+254 7XX XXX XXX"
              value={formData.phone}
              onChangeText={(v) => handleChange("phone", v)}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={formData.password}
              onChangeText={(v) => handleChange("password", v)}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />
            <Text style={styles.inputHint}>At least 8 characters</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChangeText={(v) => handleChange("confirmPassword", v)}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehicle Type</Text>
            <View style={styles.vehicleOptions}>
              {vehicleTypes.map((vehicle) => (
                <TouchableOpacity
                  key={vehicle.value}
                  style={[
                    styles.vehicleOption,
                    formData.vehicleType === vehicle.value &&
                      styles.vehicleOptionSelected,
                  ]}
                  onPress={() => handleChange("vehicleType", vehicle.value)}
                >
                  <Ionicons
                    name={vehicle.icon as any}
                    size={24}
                    color={
                      formData.vehicleType === vehicle.value
                        ? "#fff"
                        : "#374151"
                    }
                  />
                  <Text
                    style={[
                      styles.vehicleOptionText,
                      formData.vehicleType === vehicle.value &&
                        styles.vehicleOptionTextSelected,
                    ]}
                  >
                    {vehicle.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>License Plate (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="KCA 123A"
              value={formData.licensePlate}
              onChangeText={(v) =>
                handleChange("licensePlate", v.toUpperCase())
              }
              autoCapitalize="characters"
            />
          </View>

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View
              style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}
            >
              {agreedToTerms && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.registerButtonText}>Creating Account...</Text>
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signupLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 30 },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#16a34a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: { fontSize: 28, fontWeight: "700", color: "#111827", marginTop: 16 },
  tagline: { fontSize: 16, color: "#6b7280", marginTop: 4 },
  formContainer: { width: "100%", maxWidth: 400, alignSelf: "center" },
  title: { fontSize: 28, fontWeight: "700", color: "#111827", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#6b7280", marginBottom: 24 },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  errorText: { color: "#ef4444", fontSize: 14 },
  nameRow: { flexDirection: "row", gap: 12 },
  inputGroup: { marginBottom: 16, flex: 1 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },
  inputHint: { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  vehicleOptions: { flexDirection: "row", gap: 8 },
  vehicleOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 14,
  },
  vehicleOptionSelected: { backgroundColor: "#16a34a", borderColor: "#16a34a" },
  vehicleOptionText: { fontSize: 14, fontWeight: "500", color: "#374151" },
  vehicleOptionTextSelected: { color: "#fff" },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: "#16a34a", borderColor: "#16a34a" },
  termsText: { fontSize: 13, color: "#6b7280", lineHeight: 20, flex: 1 },
  termsLink: { color: "#16a34a", fontWeight: "500" },
  registerButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#16a34a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  buttonDisabled: { opacity: 0.7 },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    marginTop: 20,
  },
  signupText: { fontSize: 15, color: "#6b7280" },
  signupLink: { fontSize: 15, fontWeight: "600", color: "#16a34a" },
});
