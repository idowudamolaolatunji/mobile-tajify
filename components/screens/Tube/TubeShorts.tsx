import ShortLayout from '@/components/layouts/ShortLayout'
import { useFetchedContext } from '@/context/FetchedContext';
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'


const data = [
	{
		creator: { _id: "232", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
		// videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1710941120/Download_byehba.mp4",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
		views: 0,
		likes: 0,
		shares: 0,
		saves: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "344",
		createdAt: "2024-12-21T22:19:17.436Z",
		updatedAt: "2024-12-21T22:19:17.436Z",
		lastModified: null,
		slug: "a-good-way-to-make-money",
		__v: 0,
	},
	{
		creator: { _id: "76", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		videoUrl: "https://res.cloudinary.com/du8iw1efa/video/upload/v1736758182/original-60dad17677eecdfdb5bc2a979f141c23_dkemi9_ar05cv.mp4",
		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
		views: 0,
		likes: 0,
		shares: 0,
		saves: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "23",
		createdAt: "2024-12-21T22:19:17.436Z",
		updatedAt: "2024-12-21T22:19:17.436Z",
		lastModified: null,
		slug: "a-good-way-to-make-money",
		__v: 0,
	},
	{
		creator: { _id: "176", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1735849999/A%20good%20way%20to%20make%20money.mp4",
		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
		views: 0,
		likes: 0,
		shares: 0,
		saves: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "123",
		createdAt: "2024-12-21T22:19:17.436Z",
		updatedAt: "2024-12-21T22:19:17.436Z",
		lastModified: null,
		slug: "a-good-way-to-make-money",
		__v: 0,
	},
	
];

function TubeShorts() {
    const { handleFetchTubes, tubeShorts, loader } = useFetchedContext();
    const [activeId, setActiveId] = useState(data[0]._id);

    const onViewableItemsChanged = function({ changed, viewableItems } : any) {
        // console.log("changed:", changed, "viewableItems:", viewableItems)

        if(viewableItems.length > 0 && viewableItems[0]?.isViewable) {
            setActiveId(viewableItems[0].item._id)
        }
    }

    useEffect(function() {
        // handleFetchTubes();
    }, []);


  return (
    <View>
        <FlatList
            data={data}
            renderItem={({item}) => <ShortLayout post={item} activeId={activeId} key={item._id} />}
            pagingEnabled
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 50
            }}
            onViewableItemsChanged={onViewableItemsChanged}
        />
    </View>
  )
}

export default TubeShorts
