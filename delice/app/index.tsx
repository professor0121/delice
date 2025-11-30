import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const check = async () => {
      const value = await AsyncStorage.getItem("onboarding_done");

      if (value === null) {
        // onboarding NOT completed
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
      setIsLoading(false);
    };

    check();
  }, []);

  if (isLoading) return null;

  if (showOnboarding) {
    return <Redirect href="/(onboarding)/onboarding2" />;
  }

  return <Redirect href="/(auth)/login" />;
}
