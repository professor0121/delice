import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import OnboardingComponent from "@/components/Onboarding";

export default function Onboarding3() {
  const finish = async () => {
    await AsyncStorage.setItem("onboarding_done", "true");
    router.replace("/(auth)/login");
  };

  return (
    <OnboardingComponent
      image={require("@/assets/images/pay.png")}
      title="Let's Begin"
      description="Enjoy the full experience."
      nextButtonText="Get Started"
      nextButtonUrl="/(auth)/login"
    />
  );
}
