import { FaHome, FaUserAlt, FaBox } from 'react-icons/fa'
import { VscSettingsGear } from 'react-icons/vsc'
import { IoLogOut } from 'react-icons/io5'

const linksGenerator = (username) => [
  {
    url: '/',
    label: 'home',
    icon: <FaHome />,
  },
  {
    url: `/profile/${username}`,
    label: 'profile',
    icon: <FaUserAlt />,
  },
  {
    url: '/profile/settings',
    label: 'settings',
    icon: <VscSettingsGear />,
  },
  // {
  //    url: '/about',
  //    label: 'about',
  //    icon: <FaBox />,
  // },
  {
    url: '/logout',
    label: 'logout',
    icon: <IoLogOut />,
  },
]
export default linksGenerator
