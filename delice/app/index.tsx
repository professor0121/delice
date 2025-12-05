import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useAppSelector } from "@/redux/hooks";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusinessAccount,setIsBusinessAccount]=useState(false);
  
  const user=useAppSelector((state)=> state.auth.user)

  useEffect(() => {
    const check = async () => {
      // Check if onboarding is done
      const onboardingValue = await AsyncStorage.getItem("onboarding_done");
      setShowOnboarding(onboardingValue === null);

      // Check if user is authenticated
      const token = await AsyncStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      
      const storedAccountType = await AsyncStorage.getItem("accountType");
      if (storedAccountType === "Business") {
        setIsBusinessAccount(true);
      }

      // console.log("Auth Token:", token);
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

  if(isBusinessAccount){
    return <Redirect href="/(business)/home"/>
  }

  return <Redirect href="/(tabs)" />;
  // User is authenticated
}
