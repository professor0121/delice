// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Redirect } from "expo-router";
// import { useAppSelector } from "@/redux/hooks";

// export default function Index() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isBusinessAccount,setIsBusinessAccount]=useState(false);
  
//   const user=useAppSelector((state)=> state.auth.user)

//   useEffect(() => {
//     const check = async () => {
//       // Check if onboarding is done
//       const onboardingValue = await AsyncStorage.getItem("onboarding_done");
//       setShowOnboarding(onboardingValue === null);

//       // Check if user is authenticated
//       const token = await AsyncStorage.getItem("authToken");
//       setIsAuthenticated(!!token);
      
//       const storedAccountType = await AsyncStorage.getItem("accountType");
//       if (storedAccountType === "Business") {
//         setIsBusinessAccount(true);
//       }

//       // console.log("Auth Token:", token);
//       setIsLoading(false);
//     };

//     check();
//   }, []);

//   if (isLoading) return null;

//   if (showOnboarding) {
//     return <Redirect href="/(onboarding)/onboarding2" />;
//   }

//   if (!isAuthenticated) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   if(isBusinessAccount){
//     return <Redirect href="/(business)/home"/>
//   }

//   return <Redirect href="/(tabs)" />;
//   // User is authenticated
// }
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserProfile } from "../redux/slice/auth.slice";

export default function Index() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const onboardingValue = await AsyncStorage.getItem("onboarding_done");
      setShowOnboarding(onboardingValue === null);

      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        // Auto Login → Fetch profile
        await dispatch(fetchUserProfile());
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) return null;

  if (showOnboarding) return <Redirect href="/(onboarding)/onboarding2" />;
  console.log("user type form index",user?.accountType)
  // Not logged in
  if (!user) return <Redirect href="/(auth)/login" />;

  // Business account routing
  if (user.accountType === "Business") {
    return <Redirect href="/(business)/home" />;
  }

  return <Redirect href="/(tabs)" />;
}
