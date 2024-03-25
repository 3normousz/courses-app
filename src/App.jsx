import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import TimeTable from './timetable/TimeTable';
import CourseList from './courselist/CourseList';
import CoursesSearch from './courses/CoursesSearch';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';

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
          path='/schedule'
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <div className='poppins'>
                <div className="custom-width">
                  <UserAccount setIsAuthenticated={setIsAuthenticated} setCourses={setCourses} name={name} />
                  <TimeTable coursesData={courses} />
                  <CourseList coursesData={courses} onCoursesUpdated={fetchCourses} />
                </div>
              </div>
            </RequireAuth>
          }
        />
        <Route
          path='/courses'
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <div className='poppins custom-width'>
                <UserAccount setIsAuthenticated={setIsAuthenticated} setCourses={setCourses} name={name} />
                <CoursesSearch />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/schedule" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
