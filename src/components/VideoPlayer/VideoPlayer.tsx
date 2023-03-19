import React, { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player/dist'
import { ICourse, ILesson } from '../../interfaces/CourseInterfaces'
import './videoPlayer.scss'

interface VideoPlayerProps {
  course: ICourse
}

export const VideoPlayer: React.FC<VideoPlayerProps> = React.memo(({ course }) => {
  const [courseLesson, setCourseLesson] = useState<ILesson>({} as ILesson)
  const [videoProgress, setVideoProgress] = useState<number>(0)
  const [isLockedLesson, setIsLockedLesson] = useState<boolean>(false)
  const [lessonNumber, setLessonNumber] = useState<number>(0)
  const playerRef = useRef() as React.MutableRefObject<HTMLVideoElement>
  const btnRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (Object.keys(course).length) {
      if (course.lessons[lessonNumber].link) {
        setCourseLesson(course.lessons[lessonNumber])
        setIsLockedLesson(false)
      } else {
        setIsLockedLesson(true)
      }
    }
  }, [course.id])

  useEffect(() => {
    if (Object.keys(course).length) {
      setCourseLesson(course.lessons[lessonNumber])
    }
  }, [lessonNumber])

  // useEffect for save course progress
  useEffect(() => {
    return () => {
      const courseProgress = {
        courseId: course.id,
        lessonId: courseLesson.id,
        lessonNumber: lessonNumber,
        lessonVideoProgress: videoProgress,
      }

      localStorage.setItem('courseProgress', JSON.stringify(courseProgress))
    }
  }, [videoProgress, course.id, courseLesson.id, courseLesson.id])

  const handleProgress = (e: React.ChangeEvent<HTMLVideoElement>) => {
    //percent of video progress
    setVideoProgress((e.target.currentTime / e.target.duration) * 100)
  }

  const handleClickNext = () => {
    if (course.lessons[lessonNumber + 1]) {
      setLessonNumber(lessonNumber + 1)
    } else {
      setLessonNumber(0)
    }
  }

  const handleClickPrev = () => {
    if (course.lessons[lessonNumber - 1]) {
      setLessonNumber(lessonNumber - 1)
    } else {
      setLessonNumber(course.lessons.length - 1)
    }
  }
  const handleClickPIP = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch((err: any) => console.log(err))
      return
    }
    playerRef.current.requestPictureInPicture().catch((err: any) => console.log(err))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (playerRef.current) {
      //up arrow
      if (e.keyCode === 38) {
        // max speed is 3
        if (playerRef.current.playbackRate + 0.25 === 3) return
        playerRef.current.playbackRate += 0.25
        // down arrow
      } else if (e.keyCode === 40) {
        // min speed is 0.25
        if (playerRef.current.playbackRate - 0.25 === 0) return
        playerRef.current.playbackRate -= 0.25
      }
    }
  }

  return (
    <>
      {isLockedLesson && (
        <div className="locked">
          The course {'"'}
          {course.title}
          {'"'} is locked!
        </div>
      )}
      {!isLockedLesson && (
        <div className="video__player" onKeyDown={handleKeyDown}>
          <div className="video__player-instruction">
            Press the Up Arrow key to speed up the video, and The Down Arrow key to slow down the
            one.
          </div>
          <div className="video__player-info">
            <h5>{`Lesson: ${lessonNumber + 1} ${courseLesson.title}`}</h5>
          </div>
          <div className="video__player-video">
            <ReactHlsPlayer
              playerRef={playerRef}
              src={courseLesson.link}
              autoPlay={true}
              onProgress={handleProgress}
              controls={true}
              width="100%"
              height="auto"
            />
          </div>
          <div className="video__player-controls">
            <div className="player-controls__prev" ref={btnRef} onClick={handleClickPrev}>
              <span>Prev</span>
            </div>
            <div className="player-controls__next" onClick={handleClickNext}>
              <span>Next</span>
            </div>
            <div className="player-controls__next" onClick={handleClickPIP}>
              <span>Picture in picture</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
