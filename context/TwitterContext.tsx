import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext({ });


export const TwitterProvider = ({ children }) =>  {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const router = useRouter()
  const [tweets, setTweets] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus == 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchTweets()
  }, [currentAccount, appStatus])

  const checkIfWalletIsConnected = async () => {
    if(!window.ethereum) return

    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        // not connected
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }

  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjUlac0Af5T3WE2ZZ2KNZSzNseXCaA7728A&usqp=CAU',
        walletAddress: userWalletAddress,
      }
    } catch(error) {

    }
  }

  const fetchTweets = async () => {
    const query = `
      *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)
    `

    // setTweets(await client.fetch(query))

    const sanityResponse = await client.fetch(query)

    setTweets([])

    /**
     * Async await not available with for..of loops.
     */
    sanityResponse.forEach(async item => {
      // const profileImageUrl = await getNftProfileImage(
      //   item.author.profileImage,
      //   item.author.isProfileImageNft,
      // )

      if (item.author.isProfileImageNft) {
        const newItem = {
          tweet: item.tweet,
          timestamp: item.timestamp,
          author: {
            name: item.author.name,
            walletAddress: item.author.walletAddress,
            profileImage: item.author.profileImage,
            isProfileImageNft: item.author.isProfileImageNft,
          },
        }

        setTweets(prevState => [...prevState, newItem])
      } else {
        setTweets(prevState => [...prevState, item])
      }
    })
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${'27c78b3c-be1a-45a8-9d62-4575edda1358'}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
    const response = await client.fetch(query)

    // const profileImageUri = await getNftProfileImage(
    //   response[0].profileImage,
    //   response[0].isProfileImageNft,
    // )
      console.log('response', response)
    setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
      profileImage: response[0].profileImage,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
  }


  return (
    <TwitterContext.Provider value={{
      appStatus,
      currentAccount,
      connectWallet,
      fetchTweets,
      tweets,
      currentUser,
      getCurrentUserDetails
    }}>
      {children}
    </TwitterContext.Provider>
  )
}