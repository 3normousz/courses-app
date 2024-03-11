import axios from 'axios';

const API_URL = 'http://localhost:8080';

const login = (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log("Response received:", response);
            if (response.data.jwt) {
                localStorage.setItem('userToken', response.data.jwt);
            }
            return response.data;
        })
        .catch(error => {
            console.error('Error logging in:', error);
            throw error;
        });
};

// Function to fetch courses for the logged-in user
const getCourses = () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        return Promise.reject(new Error('User is not logged in'));
    }

    // Return the axios promise chain directly
    return axios.get(`${API_URL}/my-courses`, {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => {
            return response.data; // This ensures that getCourses() returns a promise that resolves to response.data
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            throw error; // This ensures errors are propagated up the promise chain
        });
};

const postCourse = async (course) => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        return Promise.reject(new Error('User is not logged in'));
    }

    // Return the axios promise chain directly
    return axios.post(`${API_URL}/my-courses`, course, {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.data; // This ensures that getCourses() returns a promise that resolves to response.data
        })
        .catch(error => {
            console.error('Error posting courses:', error);
            throw error; // This ensures errors are propagated up the promise chain
        });
};

export { login, getCourses, postCourse };
