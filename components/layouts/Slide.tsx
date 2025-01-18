import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import React from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";

interface ItemProps {
	id: string;
	image: string;
	title: string;
	description: string;
}

function Slide({ slideItem }: ItemProps | any) {
    const { width } = useWindowDimensions();
    
	return (
		<View style={[styles.slide, { width: width - 40 }]} key={slideItem?.id}>
			<Image style={[styles.image]} source={slideItem?.image} resizeMode="contain" />
			<Text style={[styles.title, typography.h3]}>{slideItem?.title}</Text>
			<Text style={[styles.text, typography.paragraph]}>{slideItem?.description}</Text>
		</View>
	);
}

export default Slide;

const styles = StyleSheet.create({
	slide: {
        flex: 1,
    },
	image: {
        borderRadius: 10,
        width: "95%",
        alignSelf: "center"
    },
	title: {
        color: variables.colors.text,
        textAlign: "center",
        marginBottom: 5
    },
	text: {
        color: variables.colors.text,
        textAlign: "center",
        alignSelf: "center",
        maxWidth: "85%",
    },
});
