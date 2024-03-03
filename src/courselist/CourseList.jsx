import './CourseList.css'

function CourseList(coursesData) {


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

    return (
        <>
            {transformedCourses.map((course, index) => (
                <div class="container mt-4 mx-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div class="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                            <div class="m-3">
                                <h2 class="text-lg mb-2">{course.title}
                                    <span class="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">Tag</span></h2>
                                <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{course.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CourseList;