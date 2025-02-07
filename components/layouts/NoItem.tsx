import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import React from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";

function NoItem({ title }: { title: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Image style={styles.image} source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1738849713/9214777_c1hmta.jpg" }} />
				<Text style={[typography.paragraphBg, { textAlign: "center", lineHeight: 30 }]}>
                    No {title?.replaceAll("_", " ")} found!
                </Text>
			</View>
		</View>
	);
}

export default NoItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 40
	},
	box: {
		width: "85%",
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
