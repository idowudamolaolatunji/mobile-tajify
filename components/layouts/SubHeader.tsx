import variables from "@/constants/variables";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function SubHeader() {
	return (
		<View style={styles.header}>
            <TouchableOpacity>
			    <Image source={require('@/assets/images/pngs/logo.png')} style={styles.logo} />
            </TouchableOpacity>
		</View>
	);
}

export default SubHeader;


const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
        justifyContent: "space-between",
		backgroundColor: variables.colors.background,
        paddingTop: 36,
		paddingLeft: 13,
		paddingBottom: 15,
		paddingRight: 16,
	},
    logo: {
        height: 30,
        width: 95,
        objectFit: "contain",
    },
});
