import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CourseState, ICourse } from '../interfaces/CourseInterfaces'
import { fetchCourses, fetchCourse } from './courseActions'

const initialState: CourseState = {
  courses: [],
  pageNumber: 1,
  course: {} as ICourse,
  isLoading: false,
  error: '',
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCurrentPage: (state: CourseState, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
  },
  extraReducers: {
    [fetchCourses.pending.type]: (state: CourseState) => {
      state.isLoading = true
    },
    [fetchCourses.fulfilled.type]: (state: CourseState, action: PayloadAction<Array<ICourse>>) => {
      state.isLoading = false
      state.error = ''
      state.courses = action.payload
    },
    [fetchCourses.rejected.type]: (state: CourseState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchCourse.pending.type]: (state: CourseState) => {
      state.isLoading = true
    },
    [fetchCourse.fulfilled.type]: (state: CourseState, action: PayloadAction<ICourse>) => {
      state.isLoading = false
      state.error = ''
      state.course = action.payload
    },
    [fetchCourse.rejected.type]: (state: CourseState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setCurrentPage } = courseSlice.actions


export default courseSlice.reducer