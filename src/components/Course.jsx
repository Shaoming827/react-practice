import './Course.css';
import {hasConflict } from '../utilities/timeConflicts';
import { Link } from 'react-router-dom';

const Course = ({course, selection, selected, toggleSelected, profile}) => {
    if(selection === course.term){
        let course_term = course.term === "Fall"?"F":(course.term === "Winter"?"W":"S");
        return (
            <div className = {`card m-1 p-2 ${selected.includes(course) ? 'selected' : ''} ${hasConflict(course, selected) ? 'conflicted' : ''} `} onClick={() => toggleSelected(course)}>
                <div className="card-body h-100" >
                    <h5 className="card-title">
                        <b>{course.term} CS {course.number}</b>
                        { 
                        profile?.isAdmin && 
                        <Link to={`/course/${course_term}${course.number}`}>
                            <i className="bi bi-pencil"></i>
                        </Link> }
                    </h5>
                   
                    <p className="card-text">{course.title}</p>
                </div>
                <div className="card-footer">
                        {course.meets}
                </div>
            </div>
        );
    }
};

export default Course;