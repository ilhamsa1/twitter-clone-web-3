import Post from '../Post'

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}


const tweets = [
  {
    displayName: 'Ilham',
    userName: '0x89689585785858585856889',
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU",
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-09-06T12:15:00.000Z',
  },
  {
    displayName: 'Ilham',
    userName: '0x89689585785858585856889',
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU",
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-09-06T12:15:00.000Z',
  },
  {
    displayName: 'Ilham',
    userName: '0x89689585785858585856889',
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU",
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-09-06T12:15:00.000Z',
  }
]


const ProfileTweets = () => {
  return (
    <div className={style.wrapper}>
    {tweets?.map((tweet, index) => (
      <Post
        key={index}
        displayName={tweet.displayName}
        userName={tweet.userName}
        text={tweet.text}
        avatar={tweet.avatar}
        timestamp={tweet.timestamp}
        isProfileImageNft={tweet.isProfileImageNft}
      />
    ))}
  </div>
  )
}

export default ProfileTweets
