import { Navigate } from 'react-router-dom';

/**
 * Checks if the user is authenticated.
 * This example simply checks for a token in localStorage.
 * Adapt this function to your authentication mechanism.
 */
const isAuthenticated = () => {
    const token = localStorage.getItem('userToken');
    return Boolean(token);
};

/**
 * A component that conditionally renders its children based on authentication status.
 * If the user is not authenticated, it redirects to the login page.
 */
const RequireAuth = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default RequireAuth;
