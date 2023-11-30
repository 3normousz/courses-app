import axios from 'axios';

const API_URL = 'http://localhost:8080';

const getCourses = () => {
    return axios.get(`${API_URL}/courses`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching courses:', error);
            throw error; // You can handle the error as per your application's requirements
        });
};

export default getCourses;