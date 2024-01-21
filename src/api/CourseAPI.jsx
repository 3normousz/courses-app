import axios from 'axios';

const API_URL = 'http://localhost:8080';

const getCourses = () => {
    return axios.get(`${API_URL}/courses`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching courses:', error);
            throw error;
        });
};

const postCourse = (courseData) => {
    return axios.post(`${API_URL}/courses`, courseData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating course:', error);
            throw error;
        });
};

export { getCourses, postCourse };
