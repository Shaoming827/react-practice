import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const useFormData = (validator = null, values = {}, course_key) => {
  const [state, setState] = useState(() => ({ values }));

  const change = (evt, name) => {
    
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
   
    //console.log("Id:"+id+",Error:"+error);
    evt.target.setCustomValidity(error);
    //console.log("Id:"+id+",Value:"+value);
    // state.values.map( (cur) =>{
    //   console.log(cur);
    // })
    const values = {...state.values};
    const errors = {...state.errors, [id]: error};
    for(var key in values){
      if(key === course_key){
        if(name === "title"){
          values[key].title = value;
        }else if(name === "meets"){
          values[key].meets = value;
        }
        console.log(JSON.stringify(values[key]));
      }
    }
    
    const hasError = Object.values(errors).some(x => x !== '');
    setState(hasError ? { values, errors } : { values });
  };

  return [state, change];
};