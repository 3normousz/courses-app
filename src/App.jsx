import { useState, useEffect } from 'react';
import './App.css';
import TimeTable from './timetable/TimeTable';
import CourseList from './courselist/CourseList';
import CourseForm from './courseform/CourseForm';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RequireAuth from './auth/PrivateRoutes';
import { getCourses } from './api/CourseAPI';
import UserAccount from './useraccount/UserAccount';

function App() {
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
        const storedName = localStorage.getItem('userName');
        if (storedName) setName(storedName);
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyToken();

    if (isAuthenticated) {
      fetchCourses();
    }
  }, [isAuthenticated]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} setName={setName} />} />
        <Route path="/signup" element={<SignupForm onRegister={() => setIsAuthenticated(true)} />} />
        <Route
          path='/my-courses'
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <div className='montserrat'>
                <div className='pt-6 px-6 z-0'>
                  <UserAccount setIsAuthenticated={setIsAuthenticated} setCourses={setCourses} name={name} />
                  <TimeTable coursesData={courses} />
                </div>
                <CourseForm onCoursesUpdated={fetchCourses} />
                <div className='pt-6 px-6 z-0'>
                  <CourseList coursesData={courses} onCoursesUpdated={fetchCourses} />
                </div>
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/my-courses" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
