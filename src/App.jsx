import { useState, useEffect } from 'react'
import './App.css'
import TimeTable from './timetable/TimeTable'
import CourseList from './courselist/CourseList';
import getCourses from './api/CourseAPI';

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
      <TimeTable coursesData={courses} />
      <CourseList coursesData={courses} />
    </>
  )
}

export default App
