import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseList from './CourseList.jsx';

const terms = {
    Fall: 'Fall',
    Winter: 'Winter',
    Spring: 'Spring'
};
const TermSelector = ({selection, setSelection}) => (
    <div class="btn-toolbar mb-3">
        { 
            Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
        }
    </div>
);
const TermButton = ({term, selection, setSelection}) => (
    <div className="btn-group me-2">
        <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-outline-secondary" htmlFor={term}>
    { term }
    </label>
    </div>
);

const TermPage = ({courses}) => {
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    const [selected, setSelected] = useState([]);
    const toggleSelected = (item) => setSelected(
        selected.includes(item)
        ? selected.filter(x => x !== item)
        : [...selected, item]
      );
    return (
        <div>
            <TermSelector selection ={selection} setSelection={setSelection}></TermSelector>
            <CourseList courses = {courses} selection={selection} selected={selected} toggleSelected={toggleSelected}></CourseList>
        </div>
    );

}
export default TermPage;