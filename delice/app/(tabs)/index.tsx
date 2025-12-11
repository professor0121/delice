import React from 'react'
import { View, StyleSheet } from 'react-native'
import StoryArea from '../../components/StoryArea'
import DummyPost from '../../components/DummyPost'
import { SafeAreaView } from 'react-native-safe-area-context'

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Story Row */}
      <View style={styles.storyContainer}>
        <StoryArea />
      </View>

      {/* Feed Posts */}
      <View style={{ flex: 1 }}>
        <DummyPost />
      </View>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  storyContainer: { height: 110, paddingVertical: 8 },
})
