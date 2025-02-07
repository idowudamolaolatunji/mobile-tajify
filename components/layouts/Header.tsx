import variables from "@/constants/variables";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function Header() {
	return (
		<View style={styles.header}>
            <TouchableOpacity>
			    <Image source={require('@/assets/images/pngs/logo.png')} style={styles.logo} />
            </TouchableOpacity>
			<View style={styles.container}>
				<Link href={"/(modal)/searchModal"}>
					<Ionicons name="search" size={28} color={variables.colors.text} />
				</Link>
				<TouchableOpacity>
					<Ionicons name="notifications" size={28} color={variables.colors.text} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push("/profile")}>
					<Image source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} style={styles.avatar} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Header;


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
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: variables.sizes.lg,
	},
	avatar: {
		width: 34,
		height: 34,
		borderRadius: 50,
		backgroundColor: variables.colors.bgDark
	},
});
