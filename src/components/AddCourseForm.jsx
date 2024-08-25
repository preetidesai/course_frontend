import React, { useState } from 'react';
import axios from 'axios';

const AddCourseForm = ({ onAddCourse }) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/api/courses', {
                title: courseTitle,
                code: courseCode,
                description: courseDescription
            });
            onAddCourse(response.data);  
            setCourseTitle('');
            setCourseCode('');
            setCourseDescription('');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-course-form">
            <input
                type="text"
                placeholder="Course title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
            />
            <textarea
                placeholder="Course description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-primary mt-2">Add course</button>
        </form>
    );
};

export default AddCourseForm;
