import unkwownUserImage from "@/assets/images/elements/unknown_artist.png";
import unkwownAudioImage from "@/assets/images/elements/unknown_track.png";
import unkwownBookImage from "@/assets/images/elements/unknown_book.jpg";

import { Image } from 'react-native'

export const unknownAudioImageUri = Image.resolveAssetSource(unkwownAudioImage).uri
export const unknownUserImageUri = Image.resolveAssetSource(unkwownUserImage).uri
export const unknownBookImageUri = Image.resolveAssetSource(unkwownBookImage).uri