import React, { useCallback, useEffect, useState } from 'react'
import './ScrollButton.css'
import { FaAngleDoubleUp } from 'react-icons/fa'

const ScrollButton = () => {
   const [pageHeight, setPageHeight] = useState(0)

   useEffect(() => {
      window.addEventListener('scroll', () => setPageHeight(window.pageYOffset))
      return () => window.removeEventListener('scroll', () => {})
   }, [setPageHeight])

   const scrollToTopHandler = useCallback(() => {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: 'smooth',
      })
   }, [])

   return (
      <button
         className={`${pageHeight > 100 && 'showScrollBtn'} scrollBtn transition`}
         onClick={scrollToTopHandler}>
         <FaAngleDoubleUp />
      </button>
   )
}

export default ScrollButton
