import React from "react";
import { useState } from 'react';
import { fetchFilteredCourses } from "../api/CourseAPI";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Courses() {
    const [courseName, setCourseName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const filterConditions = {
            conditions: [
                { row_field: '課程英文名稱', matcher: courseName, regex_match: true },
            ],
            pagination: {
                page: 1,
                limit: 10,
            },
        };

        fetchFilteredCourses(filterConditions)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
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
                <button type="submit">Search</button>
            </Box>
        </>
    );
}
