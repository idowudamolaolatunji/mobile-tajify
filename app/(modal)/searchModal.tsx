import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function searchModal() {
  return (
    <View style={styles.container}>
        <Text>Search</Text>
    </View>
  )
}

export default searchModal


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
