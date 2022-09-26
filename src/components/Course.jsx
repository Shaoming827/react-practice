import './Course.css';
const Course = ({course}) => (
    
    <div className = "card m-1 p-2">
        <div className ="card-body h-100">
            <h5 className="card-title"><b>{course.term} CS {course.number}</b></h5>
            <p className="card-text">{course.title}</p>
            
            
        </div>
        <div class="card-footer">
                {course.meets}
            </div>
    </div>
);

export default Course;