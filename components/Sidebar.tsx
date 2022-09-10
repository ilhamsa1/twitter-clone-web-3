import { useState, useContext  } from 'react'
import { VscTwitter } from 'react-icons/vsc'
import SidebarOption from './SidebarOption'
import { useRouter } from 'next/router'
import { RiHome7Line, RiHome7Fill, RiFile2Fill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { FiBell, FiMoreHorizontal } from 'react-icons/fi'
import { HiOutlineMail, HiMail } from 'react-icons/hi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { CgMoreO } from 'react-icons/cg'
import Modal from 'react-modal'

import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs'
import { TwitterContext } from '../context/TwitterContext'

import ProfileImageNft from './mintingModal/ProfileImageNft'

import { customStyles } from '../lib/constant' 

const style = {
  wrapper: `flex-[0.7] px-8 flex flex-col`,
  twitterIconContainer: `text-3xl m-4`,
  tweetButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  navContainer: `flex-1`,
  profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c46] rounded-[100px] p-2`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileRight: `flex-1 flex`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center mr-2`,
}



const Sidebar = ({ initialSelectedIcon = 'Home' }) => {
  const [selected, setSelected] = useState<string>(initialSelectedIcon)
  const router = useRouter()
  const { currentAccount, currentUser } = useContext(TwitterContext)

  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <VscTwitter />
      </div>
      <div className={style.navContainer}>
        <SidebarOption
          text="Home"
          Icon={selected === 'Home' ? RiHome7Fill : RiHome7Line}
          isActive={Boolean(selected === 'Home')}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOption
          text="Explore"
          Icon={selected === 'Explore' ? FaHashtag : BiHash}
          isActive={Boolean(selected === 'Explore')}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOption
          text="Notifications"
          Icon={selected === 'Notifications' ? FaBell  : FiBell}
          isActive={Boolean(selected === 'Notifications')}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOption
          text="Messages"
          Icon={selected === 'Messages' ? HiMail  : HiOutlineMail}
          isActive={Boolean(selected === 'Messages')}
          setSelected={setSelected}
          redirect="/"
        />
         <SidebarOption
          text="Bookmarks"
          Icon={selected === 'Bookmarks' ? BsBookmarkFill  : BsBookmark}
          isActive={Boolean(selected === 'Bookmarks')}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOption
          text="Profile"
          Icon={selected === 'Profile' ? RiFile2Fill  : FaRegListAlt}
          isActive={Boolean(selected === 'Profile')}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOption
          text="More"
          Icon={CgMoreO}
          isActive={Boolean(selected === 'More')}
          setSelected={setSelected}
          redirect="/"
        />
        <div
          onClick={()=> {
            router.push(`${router.pathname}/?mint=${currentAccount}`)
          }}
          className={style.tweetButton}>Mint</div>
      </div>

      <div className={style.profileButton}>
        <div className={style.profileLeft}></div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>Ilham</div>
            <div className={style.handle}>
              @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
            </div>
            </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>

      <Modal
        isOpen={Boolean(router.query.mint)}
        onRequestClose={() => router.push('/')}
        style={customStyles}
      >
        <ProfileImageNft />
      </Modal>
    </div>
  )
}

export default Sidebar
