import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";
import ComingSoon from "@/components/layouts/ComingSoon";
import { typography } from "@/constants/typography";

export default function Notification() {
	return (
        <View style={styles.pageContainer}>
            <BackButton showText />

            <Text style={[typography.h2, { color: variables.colors.text, marginTop: 20 }]}>Notifications</Text>
            
            <View style={styles.container}>
                <View style={styles.box}>
                    <Image style={styles.image} source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1738849713/9214777_c1hmta.jpg" }} />
                    <Text style={[typography.h4, { color: variables.colors.text }]}>
                        No Notification yet
                    </Text>
                </View>
            </View>
        </View>
	);
}


const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: variables.colors.background,
		paddingHorizontal: 18,
	},
    container: {
		backgroundColor: variables.colors.background,
        height: "80%",
        alignItems: "center",
        justifyContent: "center"
	},
    box: {
		width: "90%",
		borderRadius: 4,
		backgroundColor: variables.colors.bgDark,
		padding: 20,
		alignItems: "center",
	},
    image: {
        width: 80,
        height: 80,
		marginBottom: 20
    }
});
