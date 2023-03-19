import React, { useRef, useState } from 'react'
import { IMeta } from '../../interfaces/CourseInterfaces'
import './courseItem.scss'
import ReactHlsPlayer from 'react-hls-player'
import { Link } from 'react-router-dom'

interface CourseItemProps {
  title: string
  id: string
  description: string
  lessonsCount: number
  previewImageLink: string
  rating: number
  meta: IMeta
}

export const CourseItem: React.FC<CourseItemProps> = ({
  meta,
  id,
  rating,
  lessonsCount,
  description,
  title,
  previewImageLink,
}) => {
  const [videoLink, setVideoLink] = useState<string>('')
  const [active, setActive] = useState<boolean>(false)
  const playerRef = useRef() as React.MutableRefObject<HTMLVideoElement>

  const handleMouseOver = (videoLink: string | null) => {
    if (!videoLink) return
    setVideoLink(videoLink)
    setActive(true)
  }
  const handleMouseOut = () => {
    setVideoLink('')
    setActive(false)
  }

  return (
    <div className="course__item">
      <Link to={`/coursePage/${id}`}>
        <div
          className={`${active ? 'active' : ''} course__item-media`}
          onMouseOut={handleMouseOut}
          onMouseOver={() =>
            handleMouseOver(meta.courseVideoPreview ? meta.courseVideoPreview.link : null)
          }>
          {!videoLink && <img src={`${previewImageLink}/cover.webp`} alt="" />}
          {videoLink && (
            <ReactHlsPlayer
              playerRef={playerRef}
              src={videoLink}
              muted={true}
              loop={true}
              autoPlay={true}
              controls={false}
              width="100%"
              height="auto"
            />
          )}
        </div>
        <div className="course__item-content">
          <div className="item-content__title">
            <h5>{title}</h5>
          </div>
          <div className="item-content__subtitle">
            <p>{description}</p>
          </div>
          <div className="item-content__skills">
            {meta.skills && <h5>Skills for the course</h5>}
            {meta.skills && (
              <ul>
                {meta.skills.map((skill) => {
                  return <li key={skill}>{skill}</li>
                })}
              </ul>
            )}
          </div>
          <div className="item-content__lessons">
            <span>Number of lessons</span>
            <span>{lessonsCount}</span>
          </div>
          <div className="item-content__rating">
            <span>Rating</span>
            <div className="item-content__rating-star">
              <div className='star-ratings'>
                <div className="fill-ratings" style={{ width: `${((rating / 5) * 100)}%` }}>
                  <span>★★★★★</span>
                </div>
                <div className="empty-ratings">
                  <span>★★★★★</span>
                </div>
              </div>
              <span className='number-rating'>{rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
