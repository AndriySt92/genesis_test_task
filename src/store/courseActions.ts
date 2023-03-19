import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICourse } from '../interfaces/CourseInterfaces';


export const fetchCourses = createAsyncThunk<ICourse[], undefined, {rejectValue: string}>(
    'course/fetchCourses',
    async function (_, { rejectWithValue }) {
      const response = await fetch('https://api.wisey.app/api/v1/core/preview-courses',{  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMWE0MWM5ZS1iMmRhLTQzM2YtODY0NC1mZTNhMDRjNWE4MTAiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkyMjE2NzgsImV4cCI6MTY4MDEyMTY3OH0.EXFVs5hRlqeHAv8GQckCw_Sgn9BEjrww683V755Fr-8`
        }})
  
      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();
      
      // sorted course by date to render the latest courses
      return data.courses.sort((a: ICourse, b: ICourse) => new Date(b.launchDate).valueOf() - new Date(a.launchDate).valueOf());      
    }
);

export const fetchCourse = createAsyncThunk<ICourse, string, {rejectValue: string}>(
    'course/fetchCourse',
    async function (id, { rejectWithValue }) {
      const response = await fetch(`https://api.wisey.app/api/v1/core/preview-courses/${id}`,{  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMWE0MWM5ZS1iMmRhLTQzM2YtODY0NC1mZTNhMDRjNWE4MTAiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkyMjE2NzgsImV4cCI6MTY4MDEyMTY3OH0.EXFVs5hRlqeHAv8GQckCw_Sgn9BEjrww683V755Fr-8`
        }})
        
      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();

      return data     
    }
);
