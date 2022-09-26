const Course = ({course}) => (
    
    <tr>
        <td>{course.term} CS {course.number}: {course.title}</td>
    </tr>
);

export default Course;