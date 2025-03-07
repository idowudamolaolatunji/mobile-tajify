import { unknownAudioImageUri } from '@/constants/images'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NeumorphicButton from './NeumorphicButton'
import { MovingText } from './MovingText';
import variables from '@/constants/variables';
import { useAudioContext } from '@/context/AudioContext';
import { truncateString } from '@/utils/helper';


export default function FloatingPlayer({ emptyText } : { emptyText: string }) {
	const { isPlaying, handlePlayPause, handleNext, handlePrev, currentAudio, currentAudioType, currentEpsParent } = useAudioContext()

	const imageURI = currentAudioType == "podcast" ? currentEpsParent?.coverImage?.url : currentAudio?.coverImage?.url

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container]}>
			<Image
				source={{ uri: imageURI ?? unknownAudioImageUri }}
				style={styles.trackImage}
			/>

			<View style={styles.trackTitleContainer}>
				<MovingText
					style={styles.trackTitle}
					text={currentAudio?.title ?? emptyText}
					animationThreshold={10}
				/>

				{currentAudioType == "podcast" && (
					<Text>-{"  "}{truncateString(currentEpsParent?.name, 10)}</Text>
				)}
			</View>

			<View style={styles.trackControlsContainer}>
				<NeumorphicButton
					icon="play-skip-back"
					onPress={handlePrev}
				/>
				<NeumorphicButton
					icon={isPlaying ? "pause" : "play"}
					onPress={handlePlayPause}
				/>
				<NeumorphicButton
					icon="play-skip-forward"
					onPress={handleNext}
				/>
			</View>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: variables.colors.tintedWhite,
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,

		position: "absolute",
		bottom: "0%",
		left: "50%",
		transform: [{ translateX: "-45%", }],
	},
	trackImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 8,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 14,
		marginRight: 10,
		paddingLeft: 10,
	},
})
