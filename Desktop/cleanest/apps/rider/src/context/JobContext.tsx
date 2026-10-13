import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Alert } from "react-native";
import { RiderOrder } from "@laundry/shared";
import * as Location from "expo-location";

interface JobContextType {
  availableJobs: RiderOrder[];
  currentJob: RiderOrder | null;
  jobHistory: RiderOrder[];
  isLoading: boolean;
  isLocationTracking: boolean;
  fetchAvailableJobs: () => Promise<void>;
  fetchJobHistory: () => Promise<void>;
  acceptJob: (jobId: string) => Promise<void>;
  startLeg: (legId: string) => Promise<void>;
  completeLeg: (
    legId: string,
    photos: string[],
    itemCount: number,
  ) => Promise<void>;
  updateLocation: (location: Location.LocationObject) => void;
  currentLocation: Location.LocationObject | null;
  startLocationTracking: () => Promise<void>;
  stopLocationTracking: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api/v1";

let locationSubscription: Location.LocationSubscription | null = null;

export function Provider({ children }: { children: ReactNode }) {
  const [availableJobs, setAvailableJobs] = useState<RiderOrder[]>([]);
  const [currentJob, setCurrentJob] = useState<RiderOrder | null>(null);
  const [jobHistory, setJobHistory] = useState<RiderOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationTracking, setIsLocationTracking] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);

  const getAuthHeaders = async () => {
    // In real app, get token from AsyncStorage
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"token"}`,
    };
  };

  const fetchAvailableJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/riders/jobs/available`, {
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableJobs(data.jobs || []);
      }
    } catch (e) {
      console.error("Failed to fetch available jobs", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchJobHistory = useCallback(async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/riders/jobs/history`, {
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        setJobHistory(data.jobs || []);
      }
    } catch (e) {
      console.error("Failed to fetch job history", e);
    }
  }, []);

  const acceptJob = useCallback(async (jobId: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/riders/jobs/${jobId}/accept`, {
        method: "POST",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentJob(data.job);
        setAvailableJobs((prev) => prev.filter((j) => j.id !== jobId));
      }
    } catch (e) {
      console.error("Failed to accept job", e);
      throw e;
    }
  }, []);

  const startLeg = useCallback(
    async (legId: string) => {
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/riders/legs/${legId}/start`, {
          method: "POST",
          headers,
        });
        if (response.ok && currentJob) {
          const data = await response.json();
          setCurrentJob({
            ...currentJob,
            legs: (currentJob.legs || []).map((l) =>
              l.id === legId ? data.leg : l,
            ),
          });
        }
      } catch (e) {
        console.error("Failed to start leg", e);
        throw e;
      }
    },
    [currentJob],
  );

  const completeLeg = useCallback(
    async (legId: string, photos: string[], itemCount: number) => {
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(
          `${API_URL}/riders/legs/${legId}/complete`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              photos,
              itemCount,
              location: currentLocation,
            }),
          },
        );
        if (response.ok && currentJob) {
          const data = await response.json();
          setCurrentJob({
            ...currentJob,
            legs: (currentJob.legs || []).map((l) =>
              l.id === legId ? data.leg : l,
            ),
          });

          // Check if all legs completed
          const allCompleted =
            data.leg.status === "completed" &&
            (currentJob.legs || []).every(
              (l) => l.id === legId || l.status === "completed",
            );
          if (allCompleted) {
            setJobHistory((prev) => [data.job, ...prev]);
            setCurrentJob(null);
          }
        }
      } catch (e) {
        console.error("Failed to complete leg", e);
        throw e;
      }
    },
    [currentJob, currentLocation],
  );

  const updateLocation = useCallback((location: Location.LocationObject) => {
    setCurrentLocation(location);
    // Send to backend periodically
  }, []);

  const startLocationTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location permission is required for rider tracking");
      return;
    }

    const { status: bgStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (bgStatus !== "granted") {
      console.warn("Background location permission not granted");
    }

    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 5000,
      },
      (location) => {
        updateLocation(location);
      },
    );

    setIsLocationTracking(true);
  };

  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      locationSubscription = null;
    }
    setIsLocationTracking(false);
  };

  useEffect(() => {
    return () => stopLocationTracking();
  }, []);

  return (
    <JobContext.Provider
      value={{
        availableJobs,
        currentJob,
        jobHistory,
        isLoading,
        isLocationTracking,
        fetchAvailableJobs,
        fetchJobHistory,
        acceptJob,
        startLeg,
        completeLeg,
        updateLocation,
        currentLocation,
        startLocationTracking,
        stopLocationTracking,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}
