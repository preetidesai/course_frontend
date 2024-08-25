import React, { useState } from 'react';
import axios from 'axios';

const InstanceList = ({ onDeleteInstance, onViewInstance }) => {
    const [instances, setInstances] = useState([]);
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [hasClickedFetch, setHasClickedFetch] = useState(false);

    // Fetch instances based on year and semester
    const fetchInstances = async () => {
        try {
            setHasClickedFetch(true);
            const response = await axios.get(`http://localhost:9090/api/instances/${year}/${semester}`);
            console.log("Fetched instances:", response.data); // Debugging log
            setInstances(response.data);
        } catch (error) {
            console.error('Error fetching instances:', error);
        }
    };

    const handleViewInstance = async (courseId) => {
    try {
        console.log(`Viewing instance with courseId: ${courseId}`);
        const response = await axios.get(`http://localhost:9090/api/instances/${year}/${semester}/${courseId}`);
        if (response.status === 200) {
            const instanceDetails = response.data;
            console.log("Instance details:", instanceDetails);
            alert(`Instance Details:\nCourse: ${instanceDetails.course?.title || 'N/A'}\nYear: ${instanceDetails.year}\nSemester: ${instanceDetails.semester}`);
            onViewInstance(courseId);
        } else {
            console.error('Failed to fetch instance details', response.status);
        }
    } catch (error) {
        console.error('Error fetching instance details:', error);
    }
};


    // Handle delete instance by courseId
    const handleDeleteInstance = async (courseId) => {
        try {
            console.log(`Attempting to delete instance with courseId: ${courseId}`); // Debugging log
            const response = await axios.delete(`http://localhost:9090/api/instances/${year}/${semester}/${courseId}`);
            if (response.status === 200) {
                console.log('Instance deleted successfully:', courseId);
                setInstances(prevInstances => prevInstances.filter(instance => instance.course.id !== courseId));
                onDeleteInstance(courseId); // Notify parent component
            } else {
                console.error('Failed to delete instance. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting instance:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-3">
                <div className="me-2">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input
                        type="text"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="me-2">
                    <label htmlFor="semester" className="form-label">Semester</label>
                    <input
                        type="text"
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div>
                    <button onClick={fetchInstances} className="btn btn-primary mt-4" style={{ height: '2.4rem' }}>
                        List Instances
                    </button>
                </div>
            </div>

            {hasClickedFetch && instances.length === 0 && (
                <p>No courses available. Click "List Instances" to load data.</p>
            )}

            {instances.length > 0 && (
                <table className="course-list-btn">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Year-Sem</th>
                            <th>Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instances.map((instance) => (
                            <tr key={instance.id}>
                                <td>{instance.course?.title || 'N/A'}</td>
                                <td>{instance.year} - Semester {instance.semester}</td>
                                <td>{instance.course?.code || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleViewInstance(instance.course.id)} className="btn btn-primary">🔍 View</button>
                                    <button onClick={() => handleDeleteInstance(instance.course.id)} className="btn btn-primary">🗑️ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InstanceList;