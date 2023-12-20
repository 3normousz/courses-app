import React from "react";
import './TimeTable.css'


export default function TimeTable(coursesData) {

    if (!Array.isArray(coursesData)) {
        if (coursesData && typeof coursesData === 'object') {
            coursesData = Object.values(coursesData);
            coursesData = coursesData[0];
        } else {
            console.error('Invalid coursesData:', coursesData);
            return <div>Error loading courses</div>;
        }
    }

    console.log(coursesData);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = {
        '1': '8.00 - 8.50',
        '2': '9.00 - 9.50',
        '3': '10.10 - 11.00',
        '4': '11.10 - 12.00',
        '5': '13.20 - 14.10',
        '6': '14.20 - 15.10',
        '7': '15.30 - 16.20',
        '8': '16.30 - 17.20',
        '9': '17.30 - 18.20',
        'a': '18.30 - 19.20',
        'b': '19.30 - 20.20',
        'c': '20.30 - 21.20'
    };

    const parseCourseTime = (time) => {
        const matches = time.match(/([MTWRF])(\d+|[abc])/g) || [];
        return matches.map(match => {
            const dayCode = match[0];
            const slot = match.substring(1);
            let day;
            switch (dayCode) {
                case 'M': day = 'Monday'; break;
                case 'T': day = 'Tuesday'; break;
                case 'W': day = 'Wednesday'; break;
                case 'R': day = 'Thursday'; break;
                case 'F': day = 'Friday'; break;
                default: day = '';
            }
            return { day, slot };
        });
    };

    const schedule = days.map(day => ({ day, slots: {} }));

    if (Array.isArray(coursesData)) {
        coursesData.forEach(course => {
            parseCourseTime(course.time).forEach(({ day, slot }) => {
                const dayName = days.find(d => d.startsWith(day));
                if (dayName) {
                    if (!schedule.find(d => d.day === dayName).slots[slot]) {
                        schedule.find(d => d.day === dayName).slots[slot] = [];
                    }
                    schedule.find(d => d.day === dayName).slots[slot].push(course);
                }
            });
        });
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        {days.map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(timeSlots).map(slot => (
                        <tr key={slot}>
                            <td>{timeSlots[slot]}</td>
                            {days.map(day => (
                                <td key={day}>
                                    {schedule.find(d => d.day === day).slots[slot]?.map(course => (
                                        <div key={course.courseId}>
                                            <strong>{course.courseTitle}</strong><br />
                                        </div>
                                    )) || ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}