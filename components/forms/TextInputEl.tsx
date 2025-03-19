import { typography } from '@/constants/typography';
import variables from '@/constants/variables'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'


interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
}

export default function TextInputEl({ label, placeholder, value, setValue } : InputProps) {
  return (
    <View style={styles.inputElement}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={setValue} keyboardType="default" autoCapitalize="words" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
    </View>
  )
}


const styles = StyleSheet.create({
    inputElement: {
        width: "100%",
        gap: 10,
    },
    label: {
        ...typography.paragraphBg,
        color: variables.colors.text,
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 18,
        backgroundColor: variables.colors.primaryTint2,
        borderRadius: 4,
        paddingHorizontal: 10
    },
})