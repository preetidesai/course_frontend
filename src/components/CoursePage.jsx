import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './CourseList'; 
import AddInstanceForm from './AddInstanceForm'; 
import InstanceList from './InstanceList'; 

const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [instances, setInstances] = useState([]);
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    
    useEffect(() => {
        const fetchInstances = async () => {
            if (year && semester) {
                try {
                    const response = await axios.get(`http://localhost:9090/api/instances/${year}/${semester}`);
                    setInstances(response.data);
                } catch (error) {
                    console.error('Error fetching instances:', error);
                }
            }
        };

        fetchInstances();
    }, [year, semester]);

    
    const handleAddInstance = async (newInstance) => {
        try {
            await axios.post('http://localhost:9090/api/instances', {
                course: newInstance.course,
                year: newInstance.year,
                semester: newInstance.semester
            });

            
            setYear(newInstance.year);
            setSemester(newInstance.semester);
        } catch (error) {
            console.error('Error adding instance:', error);
        }
    };

    
    const handleRefreshCourses = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error refreshing courses:', error);
        }
    };

    return (
        <div>
            <h1>Course Page</h1>
            <AddInstanceForm 
                courses={courses} 
                onAddInstance={handleAddInstance} 
                onRefreshCourses={handleRefreshCourses}
            />
            <InstanceList instances={instances} /> 
            <CourseList courses={courses} />
        </div>
    );
};

export default CoursePage;