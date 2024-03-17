import { deleteCourse } from '../api/CourseAPI';
import './CourseList.css'
import DeleteIcon from '@mui/icons-material/Delete';

function CourseList({ coursesData, onCoursesUpdated }) {


    if (!Array.isArray(coursesData)) {
        if (coursesData && typeof coursesData === 'object') {
            coursesData = Object.values(coursesData);
            coursesData = coursesData[0];
        } else {
            console.error('Invalid coursesData:', coursesData);
            return <div>Error loading courses</div>;
        }
    }

    const convertTimeToSortableFormat = (timeCode) => {
        const daysOrder = ['M', 'T', 'W', 'R', 'F'];
        return timeCode.split('').reduce((acc, char, index) => {
            if (daysOrder.includes(char)) {
                acc.push({ day: daysOrder.indexOf(char), slot: parseInt(timeCode[index + 1]) });
            }
            return acc;
        }, []);
    };

    let transformedCourses = coursesData.map(course => ({
        id: course.id,
        title: course.courseTitle,
        time: course.time,
        sortableTime: convertTimeToSortableFormat(course.time)
    }));

    transformedCourses.sort((a, b) => {
        for (let i = 0; i < Math.min(a.sortableTime.length, b.sortableTime.length); i++) {
            if (a.sortableTime[i].day !== b.sortableTime[i].day) {
                return a.sortableTime[i].day - b.sortableTime[i].day;
            }
            if (a.sortableTime[i].slot !== b.sortableTime[i].slot) {
                return a.sortableTime[i].slot - b.sortableTime[i].slot;
            }
        }
        return a.sortableTime.length - b.sortableTime.length;
    });

    const handleDelete = async (courseId, event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                console.error('No user token found');
                return;
            }
            const response = await deleteCourse(courseId, token);
            console.log(response);
            onCoursesUpdated();
        } catch (error) {
            console.error('Delete course failed', error);
        }
    };


    return (
        <>
            {transformedCourses.map((course, index) => (
                <div key={index} className="container mt-4 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                            <div className="m-3">
                                <h2 className="text-lg mb-2">{course.title}
                                    <span className="text-sm inline rounded-full px-2 align-top float-right" onClick={(event) => handleDelete(course.id, event)}>
                                        <DeleteIcon />
                                    </span>
                                </h2>
                                <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{course.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CourseList;