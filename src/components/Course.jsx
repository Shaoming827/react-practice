import './Course.css';
const Course = ({course, selection, selected, toggleSelected}) => {
    if(selection === course.term){
        return (
            <div className = {`card m-1 p-2 ${selected.includes(course.number) ? 'selected' : ''}`} onClick={() => toggleSelected(course.number)}>
                <div className="card-body h-100" >
                    <h5 className="card-title"><b>{course.term} CS {course.number}</b></h5>
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