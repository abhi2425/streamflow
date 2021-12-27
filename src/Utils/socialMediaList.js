import {
  FaFacebookSquare,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'

export const generateSocialMediaLinks = (user) => {
  const socialMedia = user?.socialMedia
  const socialMediaLinks = []
  for (const link of socialMedia) {
    const copy = link.url?.toLowerCase() || ''
    if (copy?.includes('facebook'))
      socialMediaLinks?.push({ url: link.url, icon: <FaFacebookSquare /> })
    else if (copy?.includes('instagram'))
      socialMediaLinks?.push({ url: link.url, icon: <FiInstagram /> })
    else if (copy?.includes('github'))
      socialMediaLinks.push({ url: link.url, icon: <FaGithub /> })
    else if (copy.includes('twitter'))
      socialMediaLinks?.push({ url: link.url, icon: <FaTwitter /> })
    else if (copy?.includes('linkedin'))
      socialMediaLinks?.push({ url: link.url, icon: <FaLinkedin /> })
    else socialMediaLinks?.push({ url: link.url, icon: <FaLink /> })
  }
  return socialMediaLinks
}
