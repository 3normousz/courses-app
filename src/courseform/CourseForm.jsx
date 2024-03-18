import React, { useState } from 'react';
import { postCourse } from '../api/CourseAPI';
import './CourseForm.css'

function CourseForm({ onCoursesUpdated }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseId, setCourseId] = useState('');
    const [credit, setCredit] = useState('');
    const [professor, setProfessor] = useState('');
    const [professorEmail, setProfessorEmail] = useState('');
    const [time, setTime] = useState('');

    const [color, setColor] = useState(null);

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        handleResetValue();
        document.body.style.overflow = 'auto';
    };

    const handleClickOutside = (event) => {
        if (isModalOpen && !event.target.closest('#modal')) {
            closeModal();
        }
    };

    const handleInputChange = (e, setState) => {
        setState(e.target.value);
    };

    const handleResetValue = () => {
        setCourseTitle('');
        setCourseId('');
        setCredit('');
        setProfessor('');
        setProfessorEmail('');
        setTime('');
        setColor(null);
    }

    const handleSubmit = () => {
        const courseData = {
            courseTitle,
            courseId,
            credit,
            professor,
            professorEmail,
            time,
            color,
        };

        postCourse(courseData)
            .then(response => {
                console.log('Course added successfully:', response);
                handleResetValue();
                onCoursesUpdated();
            })
            .catch(error => {
                console.error('Error in submitting course:', error);
            });

        closeModal();
    };


    const colorArray = [
        "#e53935", // red
        "#673ab7", // violet
        "#3f51b5", // indigo
        "#2196f3", // blue
        "#4caf50", // green
        "#cddc39", // lime
        "#ffeb3b", // yellow
        "#ffc107", // amber
        "#ff9800", // orange
        "#795548", // brown
        "#9e9e9e", // gray
        "#607d8b", // blue gray
    ];

    return (
        <>
            <div className=''>
                <div className='custom-width'>
                    <div className='text-xl font-semibold'>
                        <p>Add a New Course</p>
                    </div>
                    <div className="flex items-center justify-center pt-6">
                        <button onClick={openModal} className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">
                            Add
                        </button>
                    </div>
                </div>
                {isModalOpen && (
                    <div id="modal" className="items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60 flex z-10 px-4" onClick={handleClickOutside}>
                        <div className="bg-white max-w-xl w-full rounded-md" onClick={(e) => e.stopPropagation()}>
                            <div className="p-3 flex items-center justify-between border-b border-b-gray-300">
                                <h3 className="font-semibold text-xl">Add a New Course</h3>
                                <span className="cursor-pointer text-2xl" onClick={closeModal}>×</span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col p-3">
                                    <h2>Course Title (*)</h2>
                                    <input type="text" className="shadow-sm border"
                                        placeholder="Enter a course title..."
                                        value={courseTitle}
                                        required
                                        onChange={(e) => handleInputChange(e, setCourseTitle)}
                                    />
                                    <h2>Course Id</h2>
                                    <input type="text" className="shadow-sm border" placeholder="Enter a course id..." value={courseId} onChange={(e) => handleInputChange(e, setCourseId)} />
                                    <h2>Course Credit</h2>
                                    <input type="text" className="shadow-sm border" placeholder="Enter course credits..." value={credit} onChange={(e) => handleInputChange(e, setCredit)} />
                                    <h2>Professor's Name</h2>
                                    <input type="text" className="shadow-sm border" placeholder="Enter a professor's name..." value={professor} onChange={(e) => handleInputChange(e, setProfessor)} />
                                    <h2>Professor's Email</h2>
                                    <input type="text" className="shadow-sm border" placeholder="Enter a professor's email..." value={professorEmail} onChange={(e) => handleInputChange(e, setProfessorEmail)} />
                                    <h2>Timeslot (*)</h2>
                                    <input type="text"
                                        className="shadow-sm border"
                                        placeholder="Enter a time for this course..."
                                        value={time}
                                        required
                                        onChange={(e) => handleInputChange(e, setTime)}
                                    />
                                    <h2>Select Color</h2>
                                    <div className='content'>
                                        {colorArray?.map((item) => (
                                            <div className={`content_item ${item === color ? 'selected' : ''}`} onClick={e => setColor(item)} style={{ background: item }} > </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-3 flex items-center justify-start">
                                    <button type="submit" className="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Add</button>
                                    <button type="button" onClick={closeModal} className="text-sm text-gray-400 border rounded-md px-4 py-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CourseForm;
