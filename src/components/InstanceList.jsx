import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstanceList = ({ year, semester }) => {
    const [instances, setInstances] = useState([]);

    useEffect(() => {
        const fetchInstances = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/instances/${year}/${semester}`);
                console.log('Instances fetched:', response.data); // Debug log
                setInstances(response.data);
            } catch (error) {
                console.error('Error fetching instances:', error);
            }
        };

        if (year && semester) {
            fetchInstances();
        }
    }, [year, semester]);

    return (
        <div>
            
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Semester</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {instances.map((instance, index) => (
                        <tr key={index}>
                            <td>{instance.course.title}</td> {/* Adjust according to your backend field names */}
                            <td>{instance.year}</td>
                            <td>{instance.semester}</td>
                            <td>
                                <button>🔍</button>
                                <button>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstanceList;
