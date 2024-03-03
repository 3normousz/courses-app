import { useState, useEffect } from 'react'
import './App.css'
import TimeTable from './timetable/TimeTable'
import CourseList from './courselist/CourseList';
import { getCourses } from './api/CourseAPI';
import CourseForm from './courseform/CourseForm';

function App() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then(data => {
        setCourses(data);
      })
      .catch(error => {
        console.error('Error in Main component:', error);
      });
  }, []);

  return (
    <>
      <div className='montserrat'>
        <div className='pt-6 px-6 z-0'>
          <TimeTable coursesData={courses} />
        </div>
        <CourseForm />
        <div className='pt-6 px-6 z-0'>
          <CourseList coursesData={courses} />
        </div>
      </div>
    </>
  )
}

export default App
