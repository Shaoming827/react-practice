
import { useNavigate } from "react-router-dom";
import { useFormData } from './UseFormData';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const validateUserData = (key, val) => {
  switch (key) {
    case 'courseTitle':
      console.log('Check title:');
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'courseMeeting':
      console.log('Check meet:');
      return /^M?(Tu)?W?(Th)?F? \d{1,2}:\d{2}-\d{1,2}:\d{2}/.test(val) ? '' : 'must contain days and start-end, e.g, MWF 12:00-13:20';
    default: return '';
  }
};

const InputField = ({name, text, value, state, change}) => {
  //console.log("Name:"+name+":"+text+":"+value);
  return(<div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name}  defaultValue={value} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>);
};
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
  let course = Object.entries(data)[0][1];
  let cur = Object.entries(course).filter(([id,cur_course])=>(cur_course.term === course_term) && (cur_course.number === course_number));
  let cur_course_title = cur[0][1].title;
  let cur_course_meetings = cur[0][1].meets;
  const [state, change] = useFormData(validateUserData, course);
  return (
    <div>
      <h1>{course_term} CS {course_number}</h1>
      <form className={state.errors ? 'was-validated' : null}>
        <InputField name="courseTitle" text="Course Title" value={cur_course_title} state={state} change={change}/>
        <InputField name="courseMeeting" text="Course Meetings" value={cur_course_meetings} state={state} change={change}/>
        <ButtonBar/>
      </form>
    </div>)
  
 };

export default CourseEditor;