import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { Button, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const { auth0Domain, auth0ClientId } = Constants.manifest.extra;

  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'delice' });

  const loginWithAuth0 = async () => {
    const authUrl = `https://${auth0Domain}/authorize?` +
      `client_id=${auth0ClientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=token&` +
      `scope=openid profile email`;

    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === 'success') {
      const { access_token } = result.params;
      const userResponse = await fetch(`https://${auth0Domain}/userinfo`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const user = await userResponse.json();
      setUserInfo(user);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userInfo ? <Text>Welcome, {userInfo.name}</Text> : <Button title="Login with Auth0" onPress={loginWithAuth0} />}
    </View>
  );
}
