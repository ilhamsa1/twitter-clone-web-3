import { useState, useContext  } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { TwitterContext } from '../../context/TwitterContext'

import InitialState from './InitialState'
import LoadingState from './LoadingState'
import FinishedState from './FinishState'
import { pinFileToIPFS, pinJSONToIPFS } from '../../lib/pinata'

import { client } from '../../lib/client'

import { contractAddress, contractABI } from '../../lib/constant'

let metamask

if (typeof window !== 'undefined') {
  metamask = window.ethereum
}

const getEthereumContract = async () => {
  if (!metamask) return
  const provider = new ethers.providers.Web3Provider(metamask)

  const signer = provider.getSigner()

  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

  return transactionContract
}

const ProfileImageNft = () => {

  const router = useRouter()
  const { currentAccount, setAppStatus } = useContext(TwitterContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('initial')
  const [profileImage, setProfileImage] = useState()

  const mint = async () => {
    if (!name || !description || !profileImage) return
    setStatus('loading')

    const pinataMetadata = {
      name: `${name} - ${description}`
    }

    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetadata)
    
    // await client.patch(currentAccount).set({
    await client.patch('27c78b3c-be1a-45a8-9d62-4575edda1358').set({
      profileImage: ipfsImageHash,
    })
    .set({ 
      isProfileImageNft: true
    })
    .commit()

    const imageMetaData = {
      name: name,
      description: description,
      image: `ipfs://${ipfsImageHash}`, 
    }

    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)
  
    const contract = await getEthereumContract()
    console.log('contractAddress', contractAddress)
    console.log('contractAddress', `ipfs://${ipfsImageHash}`)
   
    const data = await contract.mint(currentAccount,  `ipfs://${ipfsImageHash}` )
    console.log('data--')

    const transactionParameters = {
      to: contractAddress,
      from: currentAccount,
      data,
    }

    console.log(transactionParameters, 'transactionParameters')

    await metamask.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    setStatus('finished')
  }

  const modalChildren = (modalStatus = status) => {
    switch (modalStatus) {
      case 'initial':
        return (
          <InitialState
            profileImage={profileImage!}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            mint={mint}
          />
        )

      case 'loading':
        return <LoadingState />

      case 'finished':
        return <FinishedState />

      default:
        router.push('/')
        setAppStatus('error')
        break
    }
  }

  return (<>
  {modalChildren(status)}
  </>)
}

export default ProfileImageNft
