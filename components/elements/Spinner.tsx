import variables from '@/constants/variables'
import React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';


function Spinner() {
    return (
        <SafeAreaView style={styles.overlay}>
            <ActivityIndicator style={styles.spinner} size="large" color={variables.colors.primary} />
        </SafeAreaView>
    )
}

export default Spinner;


const styles = StyleSheet.create({
    overlay: {
        backgroundColor: variables.colors.background,
        flex: 1,
        // borderWidth: 1,
        // borderColor: "red",
        height: 100
    },
    spinner: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        zIndex: 101
    }
})
