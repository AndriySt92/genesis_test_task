import React from 'react'
import './home.scss'
import { Routes, Route } from 'react-router-dom'
import { Courses } from '../../components/Courses/Courses'
import { CoursePage } from '../CoursePage/CoursePage'
import { NotFound } from '../NotFound/NotFound'

export const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/coursePage/:id" element={<CoursePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}
