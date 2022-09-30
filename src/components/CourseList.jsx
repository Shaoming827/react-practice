import Course from './Course';
import './CourseList.css'
const CourseList = ({courses, selection}) => (
    <div className="course-list h-100">
        { Object.entries(courses).map(([id, course]) => <Course key={id} course={course} selection={selection}/>) }
    </div>
);

export default CourseList;