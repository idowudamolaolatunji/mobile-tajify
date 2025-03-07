import { View, Text, GestureResponderEvent, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
	icon: keyof typeof Ionicons.glyphMap;
	onPress: (event: GestureResponderEvent) => void;
	customStyle?: {};
	iconSize?: number;
	showShadow?: boolean;
}

export default function NeumorphicButton({ icon, onPress, customStyle, iconSize = 24, showShadow = true }: Props) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <View style={[styles.buttonInnerContainer, customStyle]}>
                <View style={styles.iconContainer}>
                    {showShadow && <Ionicons name={icon} size={24} style={styles.iconShadow} />}
                    <Ionicons name={icon} size={iconSize} style={styles.icon} />
                </View>
            </View>
        </TouchableOpacity>

	);
};


const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: 'transparent',
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#2a2d2fcd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonInnerContainer: {
    //   padding: 16,
      padding: 12,
      backgroundColor: '#333',
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#444',
    },
    iconContainer: {
      position: 'relative',
    },
    iconShadow: {
      position: 'absolute',
      top: 1,
      left: 1,
      color: '#353030f4',
    },
    icon: {
      color: '#ccc',
    },
});
  
