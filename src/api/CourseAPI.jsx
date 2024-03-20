import axios from 'axios';

const API_URL = 'http://localhost:8080';
const NTHU_COURSES_API_URL = 'http://localhost:3000';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.jwt) {
            localStorage.setItem('userToken', response.data.jwt);
        }
        return response.data.user.username;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const register = (username, password) => {
    return axios.post(`${API_URL}/auth/register`, { username, password }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.data.jwt) {
                localStorage.setItem('userToken', response.data.jwt);
                return response.data;
            } else {
                return login(username, password);
            }
        })
        .catch(error => {
            console.error('Error registering:', error);
            throw error;
        });
};

const getCourses = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        return Promise.reject(new Error('User is not logged in'));
    }

    try {
        const response = await axios.get(`${API_URL}/my-courses`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

const postCourse = async (course) => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        return Promise.reject(new Error('User is not logged in'));
    }

    return axios.post(`${API_URL}/my-courses`, course, {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error posting courses:', error);
            throw error;
        });
};

const deleteCourse = async (courseId) => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        return Promise.reject(new Error('User is not logged in'));
    }

    return axios.delete(`${API_URL}/my-courses/${courseId}`, {
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error deleting course:', error);
            throw error;
        });
};

const fetchFilteredCourses = async (filterConditions) => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        console.error('User is not logged in');
        return Promise.reject(new Error('User is not logged in'));
    }

    const payload = filterConditions || {
        conditions: [],
        pagination: {
            page: 1,
            limit: 10,
        },
    };

    try {
        const response = await axios.get(`${NTHU_COURSES_API_URL}/courses`, payload, {
        });
        console.log('Filtered courses:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered courses:', error);
        throw error;
    }
};

export { login, register, getCourses, postCourse, deleteCourse, fetchFilteredCourses };
