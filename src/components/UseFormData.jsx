import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const useFormData = (validator = null, values = {}) => {
  const [state, setState] = useState(() => ({ values }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
    //console.log("Id:"+id+",Error:"+error);
    evt.target.setCustomValidity(error);
    //console.log("Id:"+id+",Value:"+value);
    
    const values = {...state.values, [id]: value};
    const errors = {...state.errors, [id]: error};
    const hasError = Object.values(errors).some(x => x !== '');
    setState(hasError ? { values, errors } : { values });
  };

  return [state, change];
};