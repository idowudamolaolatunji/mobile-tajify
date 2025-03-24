import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDataContext } from "@/context/DataContext";
import { router } from "expo-router";
import variables from "@/constants/variables";

export default function VideoCameraView({}) {
	const { setPickedShortUrl, pickedShortUrl } = useDataContext()
	const [isRecording, setIsRecording] = useState(false);
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();

	const handleOpenLib = async function () {
		await ImagePicker.requestMediaLibraryPermissionsAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			videoMaxDuration: 100,
		});

		console.log(result);

		if (!result.canceled) {
		  setPickedShortUrl(result.assets[0].uri);
		  router.navigate("/shortForm");
		}
	};

	const toggleCameraFacing = function () {
		setFacing((current) => (current === "back" ? "front" : "back"));
	};

	const recordVideo = function () {};
	const saveVideo = function () {};

	const onRemoveImage = function() {
		setPickedShortUrl("");
	}

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	return (
		<CameraView style={styles.camera} facing={facing}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={handleOpenLib}>
					<Ionicons name="aperture" color="white" size={50} />
				</TouchableOpacity>

				{pickedShortUrl ? (
					<TouchableOpacity style={[styles.button, { position: "relative" } ]} onPress={saveVideo}>
						<Ionicons name="checkmark-circle" color="white" size={100} />
						<View style={styles.selected}>
							<Image source={{ uri: pickedShortUrl }} style={styles.selectedImg} />
							<TouchableOpacity onPress={onRemoveImage} style={styles.remove}>
							<AntDesign name="close" size={20} color={variables.colors.text} />
						</TouchableOpacity>
						</View>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.button} onPress={recordVideo}>
						{isRecording ? <Ionicons name="radio-button-on" color="white" size={100} /> : <Ionicons name="pause-circle" color="white" size={100} />}
					</TouchableOpacity>
				)}
				<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
					<Ionicons name="camera-reverse" color="white" size={50} />
				</TouchableOpacity>
			</View>
		</CameraView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		height: 100,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "transparent",
		marginBottom: 20,
		marginTop: "auto",
	},
	button: {
		flex: 1,
		alignItems: "center",
	},
	selected: {
		width: 50,
		height: 50,
		backgroundColor: variables.colors.bgDark,
		borderRadius: 5,
		overflow: "hidden",
		position: "absolute",
		top: 0,
		right: 0
	},
	selectedImg: {
		width: "100%",
		height: "100%",
	},
	remove: {
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#950606",
        position: "absolute",
        top: 0,
        right: 0,
		zIndex: 10
    }
});
