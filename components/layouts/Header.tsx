import variables from "@/constants/variables";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function Header() {
	return (
		<View style={styles.header}>
            <TouchableOpacity>
			    <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            </TouchableOpacity>
			<View style={styles.container}>
				<Ionicons name="search" size={28} color={variables.colors.text} />
				<TouchableOpacity>
					<Ionicons name="notifications" size={28} color={variables.colors.text} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} style={styles.avatar} />
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
        paddingTop: 12,
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
	},
});
