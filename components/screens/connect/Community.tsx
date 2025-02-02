import ComingSoon from '@/components/layouts/ComingSoon'
import React from 'react'
import { StyleSheet, View } from 'react-native'

function Community() {
  return (
    <View style={styles.container}>
        <ComingSoon feature="Community" />
    </View>
  )
}

export default Community

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})