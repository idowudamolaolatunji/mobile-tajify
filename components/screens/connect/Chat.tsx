import ComingSoon from '@/components/layouts/ComingSoon'
import React from 'react'
import { StyleSheet, View } from 'react-native'

function Chat() {
  return (
    <View style={styles.container}>
        <ComingSoon feature="Chat / Contact" />
    </View>
  )
}

export default Chat


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})