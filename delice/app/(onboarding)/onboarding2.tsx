import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingComponent from "@/components/Onboarding";

export default function Onboarding2() {
    return (
            <OnboardingComponent
                image={require("@/assets/images/delivery.png")}
                title="Welcome"
                description="This is the first step of your journey."
                nextButtonUrl="/(onboarding)/onboarding3"
            />
    );
}
