
import { useNavigate } from "react-router-dom";

const InputField = ({name, text}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name}  />
  </div>
);
const ButtonBar = ({message}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" onSubmit={() => {}}>Submit</button>
    </div>
  );
};
const CourseEditor = ({course_term, course_number,data}) => {
  return (
    <div>
      <h1>{course_term} CS {course_number}</h1>
      <form>
        <InputField name="courseTitle" text="Course Title"  />
        <InputField name="courseMeeting" text="Course Meetings"  />
        <ButtonBar/>
      </form>
    </div>)
  
 };

export default CourseEditor;