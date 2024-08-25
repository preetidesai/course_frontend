import React, { useState, useEffect } from 'react';
import AddCourseForm from './components/AddCourseForm';
import CourseList from './components/CourseList';
import AddInstanceForm from './components/AddInstanceForm';
import InstanceList from './components/InstanceList';
import './styles/App.css';

const App = () => {
    const [courses, setCourses] = useState([]);
    const [instances, setInstances] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchInstances(); // Fetch instances on component mount
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses'); // Replace with your API endpoint
            const data = await response.json();
            setCourses(data); // Ensure this matches your data structure
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const fetchInstances = async () => {
        try {
            const response = await fetch('/api/instances'); // Replace with your API endpoint for instances
            const data = await response.json();
            setInstances(data); // Ensure this matches your data structure
        } catch (error) {
            console.error('Failed to fetch instances:', error);
        }
    };

    const handleAddCourse = (course) => {
        setCourses([...courses, course]);
    };

    const handleAddInstance = (instance) => {
        setInstances([...instances, instance]);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
            if (response.ok) {
                setCourses(courses.filter(course => course.id !== courseId));
            } else {
                console.error('Failed to delete course');
            }
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

    const handleViewCourse = async (courseId) => {
        try {
            const response = await fetch(`/api/courses/${courseId}`);
            if (response.ok) {
                const courseDetails = await response.json();
                alert(`Course Title: ${courseDetails.title}\nCode: ${courseDetails.code}\nDescription: ${courseDetails.description}`);
            } else {
                console.error('Failed to fetch course details');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
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
                        onInstanceAdded={fetchInstances} // Refresh instances when an instance is added
                        courses={courses}
                    />
                </div>
            </div>
            <hr />
            <div className="lower-section">
                <CourseList
                    courses={courses}
                    onDeleteCourse={handleDeleteCourse}
                    onViewCourse={handleViewCourse}
                />
                <hr />
                <InstanceList
                    instances={instances}
                />
            </div>
        </div>
    );
};

export default App;