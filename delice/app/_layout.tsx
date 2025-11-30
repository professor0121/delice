import { Stack } from "expo-router";
import { Auth0Provider } from 'react-native-auth0';

interface AuthProviderInfo {
  Domain: string;
  ClientId: string;
}

export default function RootLayout() {
  const Domain="dev-uk6vns8t7hl250s7.us.auth0.com";
  const ClientId="UmCc4di09xVaLZaGNw291M7DovDG2gmg";
  return <Stack screenOptions={{ headerShown: false }} />;
  // (?
    // <Auth0Provider
    //   domain={Domain}
      // clientId={ClientId}>
    {/* </Auth0Provider> */}
  // )
}
