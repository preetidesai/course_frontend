import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = ({ onDeleteCourse, onViewCourse }) => {
    const [courses, setCourses] = useState([]);

    // Fetch courses from the backend
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/courses');
            setCourses(response.data); // Adjust based on your API response
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Handle delete course
    const handleDeleteCourse = async (courseId) => {
    try {
        console.log(`Attempting to delete course with ID: ${courseId}`);
        const response = await axios.delete(`http://localhost:9090/api/courses/${courseId}`);
        console.log('Response status:', response.status);

        if (response.status === 200) {
            console.log('Course deleted successfully:', courseId);
            setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
            onDeleteCourse(courseId); // Notify parent component
        } else {
            console.error('Failed to delete course. Status:', response.status);
        }
    } catch (error) {
        console.error('Error deleting course:', error);
    }
};


    // Handle view course
    const handleViewCourse = async (courseId) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/courses/${courseId}`);
            if (response.status === 200) {
                const courseDetails = response.data;
                alert(`Course Title: ${courseDetails.title}\nCode: ${courseDetails.code}\nDescription: ${courseDetails.description}`);
                onViewCourse(courseId); // Notify parent component
            } else {
                console.error('Failed to fetch course details', response.status);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    return (
        <div className="course-list">
            <button onClick={fetchCourses} className="list-courses-btn">
                List Courses
            </button>
            {courses.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Course Title</th>
                            <th>Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.code}</td>
                                <td>
                                    <button onClick={() => handleViewCourse(course.id)}>🔍 View</button>
                                    <button onClick={() => handleDeleteCourse(course.id)}>🗑️ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No courses available. Click "List Courses" to load data.</p>
            )}
        </div>
    );
};

export default CourseList;
