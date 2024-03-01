import React, { useState } from 'react';
import { postCourse } from '../api/CourseAPI';

function CourseForm() {
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

        console.log(courseData);

        postCourse(courseData)
            .then(response => {
                console.log('Course added successfully:', response);
                handleResetValue();
            })
            .catch(error => {
                console.error('Error in submitting course:', error);
            });

        closeModal();
    };
    return (
        <>
            <p>Add a New Course</p>
            <div className="flex items-center justify-center">
                <button onClick={openModal} className="text-lg text-white bg-blue-500 rounded-md px-4 py-2">
                    Add
                </button>
            </div>
            {isModalOpen && (
                <div id="modal" className="items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60 flex" onClick={handleClickOutside}>
                    <div className="bg-white max-w-xl w-full rounded-md" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3 flex items-center justify-between border-b border-b-gray-300">
                            <h3 className="font-semibold text-xl">Add a New Course</h3>
                            <span className="cursor-pointer" onClick={closeModal}>×</span>
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
                            </div>
                            <div>
                                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                            </div>
                            <div className="p-3 flex items-center justify-start">
                                <button type="submit" className="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Add</button>
                                <button type="button" onClick={closeModal} className="text-sm text-gray-400 border rounded-md px-4 py-2">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CourseForm;
