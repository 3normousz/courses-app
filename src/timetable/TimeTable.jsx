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

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
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
                case 'M': day = 'Mon'; break;
                case 'T': day = 'Tue'; break;
                case 'W': day = 'Wed'; break;
                case 'R': day = 'Thu'; break;
                case 'F': day = 'Fri'; break;
                default: day = '';
            }
            return { day, slot };
        });
    };

    const schedule = days.map(day => ({ day, slots: {} }));

    const getCourseColSpanAndSlots = (course) => {
        const courseTimes = parseCourseTime(course.time);
        // Create an object to store colSpan for each day
        const colSpans = {};
        // Create an object to store slots occupied by this course for each day
        const occupiedSlots = {};

        courseTimes.forEach(({ day, slot }) => {
            if (!colSpans[day]) {
                colSpans[day] = 1;
                occupiedSlots[day] = [];
            } else {
                colSpans[day]++;
            }
            occupiedSlots[day].push(slot);
        });

        return { colSpans, occupiedSlots };
    };


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

    const getCourseColor = (courseData) => {
        console.log(courseData)

    }
    return (
        <>
            <div className="flex items-center justify-center text-[0.75rem]">
                <div className="overflow-y-auto">
                    <table>
                        <thead>
                            <tr>
                                <th className="bg-neutral-50 border-2 border-stone-300">Time</th>
                                {days.map(day => <th key={day} className="bg-neutral-50 border-2 border-stone-300 ">{day}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(timeSlots).map(slot => (
                                <tr key={slot}>
                                    <td className="text-center bg-neutral-50 border-2 border-stone-300 ">{timeSlots[slot]}</td>
                                    {days.map(day => {
                                        const daySchedule = schedule.find(d => d.day === day);
                                        const coursesForSlot = daySchedule.slots[slot];

                                        if (coursesForSlot && coursesForSlot.length > 0) {
                                            const course = coursesForSlot[0];
                                            const { colSpans, occupiedSlots } = getCourseColSpanAndSlots(course);

                                            if (occupiedSlots[day] && occupiedSlots[day].includes(slot) && occupiedSlots[day][0] === slot) {
                                                // Apply the class to the td element directly
                                                return (
                                                    <td key={day} className='border-0' style={{ backgroundColor: course.color }} >
                                                        <div key={course.courseId}>
                                                            <strong>{course.courseTitle}</strong>
                                                        </div>
                                                    </td>
                                                );
                                            } else if (occupiedSlots[day] && !occupiedSlots[day].includes(slot)) {
                                                // This slot is not occupied by the course, render empty cell
                                                return <td key={day}>&nbsp;</td>;
                                            } else {
                                                // The slot is occupied by a multi-slot course, do not render
                                                // Add non-breaking space and background class to the td element
                                                return <td key={day} style={{ backgroundColor: course.color }}>&nbsp;</td>;
                                            }
                                        }

                                        // If no course for this slot, render empty cell
                                        // Add non-breaking space and background class to the td element
                                        return <td key={day}>&nbsp;</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody >
                    </table >
                </div>
            </div>
        </>
    )
}