import React, { useState } from 'react';
import { postCourse, fetchFilteredCourses } from "../api/CourseAPI";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card, Typography, Button, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import InfiniteScroll from "react-infinite-scroll-component";

export default function Courses() {
    const [courseName, setCourseName] = useState('');
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const translateCourse = (course) => {
        return {
            courseId: course.科號,
            chineseTitle: course.課程中文名稱,
            englishTitle: course.課程英文名稱,
            credit: course.學分數,
            sizeLimit: course.人限,
            freshmanReservation: course.新生保留人數,
            object: course.通識對象,
            geType: course.通識類別,
            language: course.授課語言,
            note: course.備註,
            suspend: course.停開註記,
            classRoomAndTime: course.教室與上課時間,
            teacher: course.授課教師,
            prerequisite: course.擋修說明,
            limitNote: course.課程限制說明,
            expertise: course.第一二專長對應,
            program: course.學分學程對應,
            noExtraSelection: course.不可加簽說明,
            requiredOptionalNote: course.必選修說明,
        };
    };



    const fetchCourses = () => {
        const filterConditions = {
            conditions: [
                { row_field: '課程英文名稱', matcher: courseName, regex_match: true },
            ],
            pagination: {
                page: page,
                limit: 10,
            },
        };


        fetchFilteredCourses(filterConditions)
            .then(data => {
                setCourses(prevCourses => [...prevCourses, ...data.courses]);

                if (data.pagination.currentPage < data.pagination.totalPages) {
                    setPage(prevPage => prevPage + 1);
                } else {
                    setHasMore(false);
                }
            })

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCourses([]);
        setPage(1);
        setHasMore(true);
        fetchCourses();
    };

    const handleSelectCourse = (course) => {
        const translatedCourse = translateCourse(course);
        console.log(translatedCourse);
        postCourse(translatedCourse)
            .then(response => {
                console.log('Course added successfully:', response);
            })
            .catch(error => {
                console.error('Error in submitting course:', error);
            });

    };


    return (
        <>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1 } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-basic"
                    label="Find a new course"
                    variant="outlined"
                    fullWidth
                    value={courseName}
                    onChange={e => setCourseName(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </Box>

            <InfiniteScroll
                dataLength={courses.length}
                next={fetchCourses}
                hasMore={hasMore}
                loader={<Typography>Loading...</Typography>}
                endMessage={<Typography>All courses loaded.</Typography>}
            >
                {courses.map((course, index) => (
                    <Card key={index} className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <Typography variant="h5" className="text-gray-800">
                                        {course.課程英文名稱}
                                    </Typography>
                                    <Typography variant="caption" className="text-gray-500">
                                        [3 หน่วยกิต]
                                    </Typography>
                                </div>
                                <Typography variant="body2" className="text-red-500 rounded-full border border-red-500 px-2 py-1">
                                    AA
                                </Typography>
                            </div>
                            <div className="flex justify-between items-center">
                                <Typography variant="body1" className="text-gray-600">
                                    {course.教室與上課時間}
                                </Typography>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleSelectCourse(course)} className="bg-blue-500 hover:bg-blue-700 text-white">
                                    Select
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </InfiniteScroll>
        </>
    );
}
