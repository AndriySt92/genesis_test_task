import React, { useEffect, useState } from 'react'
import './courses.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { ICourse } from '../../interfaces/CourseInterfaces'
import { Pagination } from '../Pagination/Pagination'
import { CourseItem } from '../CourseItem/CourseItem'
import { Loader } from '../Loader/Loader'
import { fetchCourses } from '../../store/courseActions'
import { Error } from '../Error/Error'


export const Courses = () => {
  const { courses, pageNumber, isLoading, error } = useAppSelector((state) => state.course)
  const dispatch = useAppDispatch()
  const [currentCourses, setCurrentCourses] = useState<ICourse[]>(courses.slice(0, 10))

  useEffect(() => {
    dispatch(fetchCourses())
  }, [])

  useEffect(() => {
    function paginate(array: any, page_size: number, page_number: number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size)
    }

    setCurrentCourses(paginate(courses, 10, pageNumber))
  }, [pageNumber, courses.length])


  if (error) {
    return <Error error={"Server error"} />
  }

  if(!courses.length || isLoading){
    return <Loader/>
  }

  return (
    <div className="courses">
      <div className='courses__title'>
        <h5>Wisey - the education courses.</h5>
      </div>
      <div className="courses__list">
        {currentCourses.map((course) => {
          return <CourseItem {...course} key={course.id} />
        })}
      </div>
      <Pagination totalPage={Math.ceil(courses.length + 1) / 10} pageNumber={pageNumber} />
    </div>
  )
}
