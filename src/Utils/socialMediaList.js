import {
  FaFacebookSquare,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'

export const generateSocialMediaLinks = (user) => {
  const socialMedia = user && user.socialMedia
  const links = {}
  for (const link of socialMedia) {
    if (link.url?.includes('facebook')) links['facebook'] = link.url
    else if (link.url?.includes('instagram')) links['instagram'] = link.url
    else if (link.url?.includes('github')) links['github'] = link.url
    else if (link.url?.includes('twitter')) links['twitter'] = link.url
    else if (link.url?.includes('linkedin')) links['linkedin'] = link.url
    else links['link'] = link.url
  }
  const socialMediaLinks = []
  for (const key in links) {
    if (key === 'facebook')
      socialMediaLinks.push({ icon: <FaFacebookSquare />, url: links[key] })
    else if (key === 'instagram')
      socialMediaLinks.push({ icon: <FiInstagram />, url: links[key] })
    else if (key === 'github')
      socialMediaLinks.push({ icon: <FaGithub />, url: links[key] })
    else if (key === 'twitter')
      socialMediaLinks.push({ icon: <FaTwitter />, url: links[key] })
    else if (key === 'linkedin')
      socialMediaLinks.push({ icon: <FaLinkedin />, url: links[key] })
    else socialMediaLinks.push({ icon: <FaLink />, url: links[key] })
  }
  return socialMediaLinks
}
