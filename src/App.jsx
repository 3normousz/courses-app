import { useState, useEffect } from 'react';
import './App.css';
import TimeTable from './timetable/TimeTable';
import CourseList from './courselist/CourseList';
import CourseForm from './courseform/CourseForm';
import LoginForm from './auth/LoginForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RequireAuth from './auth/PrivateRoutes';
import { getCourses } from './api/CourseAPI';
import UserAccount from './useraccount/UserAccount';

function App() {
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Attempt to verify token on app initialization
    const verifyToken = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        // Here you'd typically verify the token's validity with your backend
        // For simplicity, we'll assume the presence of the token implies valid authentication
        // Adjust this logic based on your application's needs
        setIsAuthenticated(true);
      }
    };

    verifyToken();

    if (!isAuthenticated) {
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        console.log(response);
        setCourses(response);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [isAuthenticated]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
        <Route
          path='/my-courses'
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <div className='montserrat'>
                <div className='pt-6 px-6 z-0'>
                  <UserAccount setIsAuthenticated={setIsAuthenticated} />
                  <TimeTable coursesData={courses} />
                </div>
                <CourseForm />
                <div className='pt-6 px-6 z-0'>
                  <CourseList coursesData={courses} />
                </div>
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/my-courses" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
