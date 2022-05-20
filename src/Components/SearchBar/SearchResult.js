/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useMemo, useState } from 'react'
import { VscCircleFilled } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import Avatar from '../UIComponents/Avatar/Avatar'
import { BiNews } from 'react-icons/bi'

const tabs = [
  { id: 'tab1-tab', name: 'Posts' },
  { id: 'tab2-tab', name: 'Users' },
]

const SearchResult = ({ searchTerm = '', close = () => {} }) => {
  const { searchData } = useGeneralContext()
  const [active, setActive] = useState(tabs[0].id)

  const posts = searchData[0]?.posts
  const users = searchData[1]?.users
  const tab = tabs.map((data) => (
    <div id={data.id} className='active' key={data.id} onClick={() => setActive(data.id)}>
      {data.name}
    </div>
  ))

  const postsList = useMemo(
    () =>
      posts?.map((post, index) => (
        <div onClick={close} key={index} style={{ marginBottom: '1.5rem' }}>
          <Link to={`/${post?.postOwner}/post/${post?.title}`} className='flex-x-between'>
            <div className='flex-x-between'>
              {post.blogImages?.[0]?.image ? (
                <img
                  src={post.blogImages?.[0]?.image}
                  alt='post-img'
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <i>
                  <BiNews color='black' size={30} />
                </i>
              )}
              <p style={{ fontSize: 16, color: 'black' }}>{post?.title}</p>
            </div>

            <div className='flex-row' style={{ alignSelf: 'center' }}>
              <div className='created-at flex-row'>
                <i style={{ alignSelf: 'center' }}>
                  <VscCircleFilled />
                </i>
              </div>
              <div style={{ width: '100%' }}>
                <p style={{ fontSize: 13, color: 'black' }}> {post.postOwner}</p>
              </div>
            </div>
          </Link>
        </div>
      )),
    [posts],
  )
  const usersList = useMemo(
    () =>
      users?.map((user, index) => (
        <div className='flex-row ' key={index} style={{ marginTop: '.8rem' }} onClick={close}>
          <Link to={`/profile/${user.userName}`} className='flex-row' style={{ width: '100%' }}>
            <Avatar avatarImageUrl={user?.avatar?.image} imageClass='avatar-small' />
            <div style={{ width: '100%' }} className='m-left-s'>
              <p style={{ fontSize: 15, color: 'black' }}>{user.name}</p>
              <p style={{ fontSize: 13, color: 'black' }}> {user.userName}</p>
            </div>
          </Link>
        </div>
      )),
    [users],
  )

  if (searchData.length && searchData[0]?.success === false) {
    return (
      <div className='result-container'>
        <div className='container'>
          <p style={{ fontSize: 13 }}>{`No results found for search term "${searchTerm}"`} </p>
        </div>
      </div>
    )
  }

  return (
    <div className='result-container'>
      {searchData.length ? (
        <div className='container'>
          <header>
            <div id='material-tabs'>
              {tab}
              <span className={'yellow-bar ' + active}></span>
            </div>
          </header>

          <div className='tab-content'>
            <div id='tab1' style={{ display: active === tabs[0].id ? 'block' : 'none' }}>
              {postsList?.length ? (
                postsList
              ) : (
                <p style={{ fontSize: 14 }}>Nothing related to posts found...</p>
              )}
            </div>

            <div id='tab2' style={{ display: active === tabs[1].id ? 'block' : 'none' }}>
              {usersList?.length ? usersList : <p style={{ fontSize: 14 }}>No users found...</p>}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SearchResult
