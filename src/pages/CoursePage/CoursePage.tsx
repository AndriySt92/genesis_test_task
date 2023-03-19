import React, { useEffect } from 'react'
import './coursePage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchCourse } from '../../store/courseActions'
import { Loader } from '../../components/Loader/Loader'
import ArrowLeft from '../../assets/arrow-left.png'
import { Error } from '../../components/Error/Error'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'

export const CoursePage = () => {
  const { course, isLoading, error } = useAppSelector((state) => state.course)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(fetchCourse(id))
    }
  }, [])

  const goBack = () => {
    navigate(-1)
  }

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="course__page slide-in-fwd-tr">
      <div className="course__page-arrow" onClick={goBack}>
        <img src={ArrowLeft} alt="" />
      </div>
      <VideoPlayer course={course} />
    </div>
  )
}
