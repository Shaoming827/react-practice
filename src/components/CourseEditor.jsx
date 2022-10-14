
import { useNavigate } from "react-router-dom";
import { useFormData } from './UseFormData';
import { useDbUpdate } from '../utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      //console.log('Check title:');
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      //console.log('Check meet:');
      return /^M?(Tu)?W?(Th)?F? \d{1,2}:\d{2}-\d{1,2}:\d{2}/.test(val) ? '' : 'must contain days and start-end, e.g, MWF 12:00-13:20';
    default: return '';
  }
};

const InputField = ({name, text, state, cur_course, change, course_key={course_key}}) => {
  // console.log("Name:"+name+" :"+text+":");
  // console.log("state:"+JSON.stringify(state));
  return(<div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name}  defaultValue={cur_course[name]} onChange={(evt) => change(evt,name)} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>);
};
const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};
const CourseEditor = ({course_key,data}) => {
  const [update, result] = useDbUpdate(`/courses/${course_key}`);
  //  console.log(JSON.stringify(data));
  const [state, change] = useFormData(validateUserData, data,course_key);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      for(var key in state.values){
        if(key === course_key){
          let update_value = state.values[key];
          update(update_value);
        }
      }
    }
    console.log(JSON.stringify(state.values));
  };
  //console.log("State:"+JSON.stringify(state));
  const cur_course = state.values[course_key];
  //console.log("Cur:"+JSON.stringify(cur_course));
  return (
    <div>
      <h1>{cur_course["term"]} CS {cur_course["number"]}</h1>
      <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
        <InputField name="title" text="Course Title" state={state} cur_course={cur_course} course_key={course_key} change={change}/>
        <InputField name="meets" text="Course Meetings" state={state} cur_course={cur_course} course_key={course_key} change={change}/>
        <ButtonBar message={result?.message}/>
      </form>
    </div>)
 };

export default CourseEditor;