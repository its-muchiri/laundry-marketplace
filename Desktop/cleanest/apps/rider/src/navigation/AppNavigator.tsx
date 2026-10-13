import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobContext";
import HomeScreen from "../screens/HomeScreen";
import AvailableJobsScreen from "../screens/AvailableJobsScreen";
import ActiveJobScreen from "../screens/ActiveJobScreen";
import JobHistoryScreen from "../screens/JobHistoryScreen";
import EarningsScreen from "../screens/EarningsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RiderTabs() {
  const { fetchAvailableJobs } = useJobs();

  React.useEffect(() => {
    fetchAvailableJobs();
  }, [fetchAvailableJobs]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Jobs")
            iconName = focused ? "briefcase" : "briefcase-outline";
          else if (route.name === "History")
            iconName = focused ? "time" : "time-outline";
          else if (route.name === "Earnings")
            iconName = focused ? "cash" : "cash-outline";
          else iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 8,
        } as any,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Jobs" component={AvailableJobsScreen} />
      <Tab.Screen name="History" component={JobHistoryScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Show splash screen
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        } as any,
        headerTitleStyle: { fontWeight: "600", color: "#111827" },
        headerTintColor: "#16a34a",
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="RiderTabs" component={RiderTabs} />
          <Stack.Screen
            name="ActiveJob"
            component={ActiveJobScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
