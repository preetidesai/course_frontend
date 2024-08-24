import React, { useState } from 'react';
import axios from 'axios';

const AddInstanceForm = ({ courses, onAddInstance, onRefreshCourses }) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    const handleAddInstance = async (e) => {
        e.preventDefault();
        if (selectedCourse && year && semester) {
            try {
                const response = await axios.post('http://localhost:9090/api/instances', {
                    courseId: selectedCourse, 
                    year,
                    semester
                });
                setSelectedCourse('');
                setYear('');
                setSemester('');
                onAddInstance(response.data); 
            } catch (error) {
                console.error('Error adding instance:', error);
            }
        }
    };

    return (
        <form onSubmit={handleAddInstance}>
            <div className="form-group">
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
                                {course.title} {}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={onRefreshCourses} className="btn btn-secondary ms-2">
                        Refresh
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-control"
                    placeholder="Enter year"
                />
            </div>
            <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input
                    type="text"
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="form-control"
                    placeholder="Enter semester"
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
                Add Instance
            </button>
        </form>
    );
};

export default AddInstanceForm;
