import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, updateUser } = useAuth();
  const [avatar, setAvatar] = React.useState<string | null>(
    user?.avatarUrl || null,
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      // In real app, upload to server
      if (user) updateUser({ ...user, avatarUrl: result.assets[0].uri });
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  const menuItems = [
    { title: "My Documents", icon: "document-text", screen: "Documents" },
    { title: "Vehicle Details", icon: "car", screen: "Vehicle" },
    { title: "Payout Settings", icon: "cash", screen: "Payout" },
    { title: "Notifications", icon: "notifications", screen: "Notifications" },
    { title: "Support & Help", icon: "help-circle", screen: "Support" },
    { title: "Terms & Conditions", icon: "document", screen: "Terms" },
    { title: "Privacy Policy", icon: "shield", screen: "Privacy" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickAvatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitials}>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </Text>
            </View>
          )}
          <View style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.role}>
          {user?.role === "rider" ? "Rider" : user?.role}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text style={styles.ratingText}>4.8 • 127 ratings</Text>
          <View style={styles.verificationBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#16a34a" />
            <Text style={styles.verificationText}>Verified</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>142</Text>
          <Text style={styles.statLabel}>Jobs Done</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2.3h</Text>
          <Text style={styles.statLabel}>Avg Time</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon as any} size={24} color="#374151" />
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dangerZone}>
        <Text style={styles.dangerTitle}>Danger Zone</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.version}>
        <Text style={styles.versionText}>LaundryKE Rider v1.0.0</Text>
        <Text style={styles.versionText}>Build 100</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { paddingBottom: 100 },
  profileHeader: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  avatarContainer: { position: "relative", marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: { fontSize: 36, fontWeight: "700", color: "#16a34a" },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#16a34a",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: { fontSize: 24, fontWeight: "700", color: "#111827" },
  role: { fontSize: 14, color: "#6b7280", marginTop: 2, marginBottom: 12 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  ratingText: { fontSize: 14, color: "#374151", fontWeight: "500" },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verificationText: { fontSize: 12, fontWeight: "600", color: "#16a34a" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statItem: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, height: 40, backgroundColor: "#e5e7eb" },
  statNumber: { fontSize: 24, fontWeight: "700", color: "#111827" },
  statLabel: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
  menuSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    gap: 12,
  },
  menuTitle: { flex: 1, fontSize: 16, color: "#111827" },
  dangerZone: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ef4444",
    marginBottom: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  logoutText: { fontSize: 16, fontWeight: "600", color: "#ef4444" },
  version: { alignItems: "center", paddingVertical: 20, gap: 4 },
  versionText: { fontSize: 12, color: "#9ca3af" },
});
