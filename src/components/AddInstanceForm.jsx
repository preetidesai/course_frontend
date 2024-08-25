import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddInstanceForm = ({ onInstanceAdded }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    // Fetch the list of courses
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (year && semester && selectedCourse) {
            const course = courses.find(course => course.id === parseInt(selectedCourse));
            
            const instanceData = {
                year: parseInt(year),
                semester: parseInt(semester),
                course: {
                    id: course.id,
                    title: course.title,
                    code: course.code,
                    description: course.description
                }
            };

            try {
                const response = await axios.post('http://localhost:9090/api/instances', instanceData);
                console.log('Instance added:', response.data);
                // Clear form fields
                setYear('');
                setSemester('');
                setSelectedCourse('');
                // Notify parent component
                onInstanceAdded();
            } catch (error) {
                console.error('Error adding instance:', error);
            }
        } else {
            console.error('Please fill in all fields.');
        }
    };

    // Fetch courses on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <label htmlFor="course">Select Course</label>
            <div className="d-flex">
                <select
                    id="course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="form-control"
                >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
                <button onClick={fetchCourses} className="btn btn-primary">
                    Refresh
                </button>
            </div>

            <label htmlFor="year">Year</label>
            <input
                type="text"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-control"
            />

            <label htmlFor="semester">Semester</label>
            <input
                type="text"
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="form-control"
            />

            <button onClick={handleSubmit} className="btn btn-primary">
                Add Instance
            </button>
        </div>
    );
};

export default AddInstanceForm;