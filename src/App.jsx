import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AddCourseForm from './components/AddCourseForm.jsx';
import CourseList from './components/CourseList.jsx';
import InstanceList from './components/InstanceList.jsx';
import AddInstanceForm from './components/AddInstanceForm.jsx';
import './styles/App.css';

const App = () => {
    const [courses, setCourses] = useState([]);
    const [instances, setInstances] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCourses(data.courses);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const handleAddCourse = (course) => {
        setCourses([...courses, course]);
    };

    const handleAddInstance = (instance) => {
        setInstances([...instances, instance]);
    };

    const handleRefreshCourses = () => {
        fetchCourses(); // Refresh the course list
    };

    return (
        <div className="container">
            <div className="forms-container">
                <div className="form-section">
                    <h2>Add Course</h2>
                    <AddCourseForm onAddCourse={handleAddCourse} />
                </div>
                <div className="form-section">
                    <h2>Add Instance</h2>
                    <AddInstanceForm
                        courses={courses}
                        onAddInstance={handleAddInstance}
                        onRefreshCourses={handleRefreshCourses}
                    />
                </div>
            </div>
            <div className="lower-section">
                <CourseList courses={courses} />
                <InstanceList instances={instances} />
            </div>
        </div>
    );
};

export default App;
