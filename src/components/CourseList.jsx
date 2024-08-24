import React from 'react';

const CourseList = ({ courses }) => {
    return (
        <div className="course-list">
            <button className="list-courses-btn">List courses</button>
            <table>
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course.title}</td> {}
                            <td>{course.code}</td>
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

export default CourseList;
