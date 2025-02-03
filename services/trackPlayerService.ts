import TrackPlayer, { Capability, AppKilledPlaybackBehavior } from 'react-native-track-player';

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      progressUpdateEventInterval: 2,
    });
    return true;
  } catch (error) {
    console.error('Error setting up player:', error);
    return false;
  }
}

export async function addTrack(track) {
  await TrackPlayer.add(track);
}

export async function playTrack() {
  await TrackPlayer.play();
}

export async function pauseTrack() {
  await TrackPlayer.pause();
}

export async function stopTrack() {
  await TrackPlayer.stop();
}

export async function skipToNext() {
  await TrackPlayer.skipToNext();
}

export async function skipToPrevious() {
  await TrackPlayer.skipToPrevious();
}

// Register playback service
export default async function PlaybackService() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
} 