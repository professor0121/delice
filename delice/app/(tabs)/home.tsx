import React from 'react'
import { View ,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '@/redux/hooks'


const home = () => {
    const user=useAppSelector(state => state.auth.user);
  return (
    <SafeAreaView>
   <View>
    <Text>Home Screen {user?.email as any}</Text>
   </View>
    </SafeAreaView>
  )
}

export default home
