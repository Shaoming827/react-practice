import Course from './Course';
import './CourseList.css'
const CourseList = ({courses, selection, selected, toggleSelected,profile}) => (
    <div className="course-list h-100">
        { Object.entries(courses).map(([id, course]) => <Course key={id} course={course} selection={selection} selected={selected} toggleSelected={toggleSelected} profile={profile}/>) }
    </div>
);

export default CourseList;