import './Course.css';
import {hasConflict } from '../utilities/timeConflicts';
import { Link } from 'react-router-dom';

const Course = ({course, selection, selected, toggleSelected}) => {
    if(selection === course.term){
        
        return (
            <div className = {`card m-1 p-2 ${selected.includes(course) ? 'selected' : ''} ${hasConflict(course, selected) ? 'conflicted' : ''} `} onClick={() => toggleSelected(course)}>
                <div className="card-body h-100" >
                    <h5 className="card-title">
                        <b>{course.term} CS {course.number}</b>
                        <Link to={{
                                    pathname: `/course/${course.term}/${course.number}`,
                                    title: course.title,
                                    meets: course.meets
                                  }}>
                                  <i class="bi bi-pencil"></i>
                        </Link>
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