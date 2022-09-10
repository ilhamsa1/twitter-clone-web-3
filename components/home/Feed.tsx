import { useContext, useEffect } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

import { BsStars } from 'react-icons/bs'
import Post from '../Post'
import TweetBox from './TweetBox'

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

// const tweets = [
//   {
//     displayName: 'Ilham',
//     userName: '0x89689585785858585856889',
//     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU",
//     text: 'gm',
//     isProfileImageNft: false,
//     timestamp: '2022-09-06T12:15:00.000Z',
//   },
//   {
//     displayName: 'Ilham',
//     userName: '0x89689585785858585856889',
//     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU",
//     text: 'gm',
//     isProfileImageNft: false,
//     timestamp: '2022-09-06T12:15:00.000Z',
//   },
//   {
//     displayName: 'Ilham',
//     userName: '0x89689585785858585856889',
//     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU",
//     text: 'gm',
//     isProfileImageNft: false,
//     timestamp: '2022-09-06T12:15:00.000Z',
//   }
// ]

const Feed = () => {
  const { tweets } = useContext(TwitterContext)
  console.log(tweets, 'ddddddd')
  return (
    <div className={`${style.wrapper}`}>
      <div className={style.header}>
        <div className={style.headerTitle}>
          Home
        </div>
        <BsStars />
      </div>
      <TweetBox />
      {
        tweets.map((tweet, index) => (
          <Post 
            key={index}
            displayName={tweet.author.name}
            userName={tweet.author.name === 'Unnamed'
            ? `${tweet.author.walletAddress.slice(
                0,
                4,
              )}...${tweet.author.walletAddress.slice(41)}`
            : tweet.author.name}
            avatar={tweet.author.profileImage}
            text={tweet.tweet}
            isProfileImageNft={tweet.isProfileImageNft}
            timestamp={tweet.timestamp}
          />
        ) )
      }
    </div>
  )
}

export default Feed
