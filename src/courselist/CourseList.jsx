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
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Time Slot</th>
                </tr>
            </thead>
            <tbody>
                {transformedCourses.map((course, index) => (
                    <tr key={index}>
                        <td>{course.title}</td>
                        <td>{course.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CourseList;