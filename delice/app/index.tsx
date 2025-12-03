// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Redirect } from "expo-router";

// export default function Index() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(false);

//   useEffect(() => {
//     const check = async () => {
//       const value = await AsyncStorage.getItem("onboarding_done");

//       if (value === null) {
//         // onboarding NOT completed
//         setShowOnboarding(true);
//       } else {
//         setShowOnboarding(false);
//       }
//       setIsLoading(false);
//     };

//     check();
//   }, []);

//   if (isLoading) return null;

//   if (showOnboarding) {
//     return <Redirect href="/(onboarding)/onboarding2" />;
//   }

//   return <Redirect href="/(auth)/login" />;
// }
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      // Check if onboarding is done
      const onboardingValue = await AsyncStorage.getItem("onboarding_done");
      setShowOnboarding(onboardingValue === null);

      // Check if user is authenticated
      const token = await AsyncStorage.getItem("authToken");
      console.log("Auth Token:", token);
      setIsAuthenticated(!!token);

      setIsLoading(false);
    };

    check();
  }, []);

  if (isLoading) return null;

  if (showOnboarding) {
    return <Redirect href="/(onboarding)/onboarding2" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // User is authenticated
  return <Redirect href="/(tabs)/home" />;
}
