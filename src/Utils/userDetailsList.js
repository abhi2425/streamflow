import { CgChevronDoubleRightO } from 'react-icons/cg'
import { ImClock, ImLocation } from 'react-icons/im'
import { IoSchoolSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import date from 'date-and-time'

export const generateUserDetailList = (user) => [
  {
    icon: <ImClock />,
    details: `Joined on-> ${date.format(
      new Date(Date.parse(user?.createdAt)),
      'ddd, MMM DD YYYY'
    )}`,
  },
  {
    icon: <IoSchoolSharp />,
    details: (
      <p>
        {user?.eduQualification
          ? `${user?.eduQualification.institution},
                        ${user?.eduQualification.name},
                        ${user?.eduQualification.subject}`
          : 'Education'}
      </p>
    ),
  },
  {
    icon: <CgChevronDoubleRightO />,
    details:
      user?.interests.length > 1 ? (
        <p>
          {user?.interests.map((interest, index) => (
            <span key={index}>
              {user.interests.length - 1 !== index
                ? `${interest}, `
                : `${interest}`}
            </span>
          ))}
        </p>
      ) : (
        <p>Interests</p>
      ),
  },
  {
    icon: <MdWork />,
    details: (
      <p>
        {user?.currentlyWorking
          ? `${user?.currentlyWorking?.description}, 
                        ${user?.currentlyWorking?.startedIn}`
          : 'Work'}
      </p>
    ),
  },
  {
    icon: <ImLocation />,
    details: (
      <p>
        {user?.address
          ? `${user?.address?.country}, 
                        ${user?.address?.state},`
          : 'Address'}
        <br />
        {user?.address
          ? `${user?.address?.city},
                        ${user?.address?.pinCode}`
          : ''}
      </p>
    ),
  },
]
