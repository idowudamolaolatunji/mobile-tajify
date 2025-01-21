import TubeLayout from '@/components/layouts/TubeLayout'
import variables from '@/constants/variables'
import React from 'react'
import { ScrollView, View } from 'react-native'


const tubeData = [
  {
    id: '1',
    title: 'How to Make a Perfect Cup of Coffee with javascript and react',
    description: 'Learn the art of coffee making with our expert barista. In this video, we cover everything from bean selection to the perfect brewing temperature. Don\'t forget to like and subscribe for more coffee tutorials! #Coffee #Barista #CoffeeLover',
    thumbnail: 'https://i.imgur.com/7YTTkEO.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-coffee-pot-1893-large.mp4',
    views: '1.2M',
    datePosted: '2 days ago',
    likes: '45K',
    channel: {
      name: 'Coffee Masters',
      avatar: 'https://ui-avatars.com/api/?name=Coffee&background=random',
      subscribers: '500K'
    }
  },
  {
    id: '2',
    title: 'How to Make a Perfect Cup of Coffee',
    description: 'Learn the art of coffee making with our expert barista. In this video, we cover everything from bean selection to the perfect brewing temperature. Don\'t forget to like and subscribe for more coffee tutorials! #Coffee #Barista #CoffeeLover',
    thumbnail: 'https://i.imgur.com/7YTTkEO.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-coffee-pot-1893-large.mp4',
    views: '1.2M',
    datePosted: '2 days ago',
    likes: '45K',
    channel: {
      name: 'Coffee Masters',
      avatar: 'https://ui-avatars.com/api/?name=Coffee&background=random',
      subscribers: '500K'
    }
  },
  {
    id: '3',
    title: 'How to Make a Perfect Cup of Coffee',
    description: 'Learn the art of coffee making with our expert barista. In this video, we cover everything from bean selection to the perfect brewing temperature. Don\'t forget to like and subscribe for more coffee tutorials! #Coffee #Barista #CoffeeLover',
    thumbnail: 'https://i.imgur.com/7YTTkEO.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-making-coffee-in-coffee-pot-1893-large.mp4',
    views: '1.2M',
    datePosted: '2 days ago',
    likes: '45K',
    channel: {
      name: 'Coffee Masters',
      avatar: 'https://ui-avatars.com/api/?name=Coffee&background=random',
      subscribers: '500K'
    }
  }
]

function TubeMax() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
            {tubeData.length > 0 && tubeData.map(tube => (
                <TubeLayout video={tube} />
            ))}
        </View>
    </ScrollView>
  )
}

export default TubeMax
