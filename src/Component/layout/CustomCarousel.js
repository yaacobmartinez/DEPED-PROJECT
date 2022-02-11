import React, { useCallback, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import axiosInstance from '../../library/axios'
import {carouselImages} from '../utils/constants'
function CustomCarousel() {
  const [announcements, setAnnouncements] = useState(null)
  const getAnnouncements = useCallback(async() => {
      const {data} = await axiosInstance.get(`/globals`)
      console.log(data)
      setAnnouncements(data.images.reverse())
  }, [])
  useEffect(() => {
      getAnnouncements()
  },[getAnnouncements])
    return (
        <Carousel
          dynamicHeight
          showThumbs={false}
          autoPlay
          infiniteLoop
          centerMode
          interval={6000}
        >
          {announcements?.map((image, index) => (
            <div key={index}>
              <img src={image.link} alt="carousel_image" style={{height: '100vh'}} />
            </div>
          ))}
        </Carousel>
    )
}

export default CustomCarousel
