import variables from '@/constants/variables'
import React from 'react'
import { View, Text } from 'react-native'


function Profile() {
  return (
    <View style={{ backgroundColor: variables.colors.background, flex: 1 }}>
        <Text style={{ color: variables.colors.text }}>Profile</Text>
    </View>
  )
}

export default Profile
