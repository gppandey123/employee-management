import { ADD_EMPLOYEE, CLEAR_CURRENT_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, SET_CURRENT_EMPLOYEE } from "../constant";

export const addEmployee = (employee) => ({
    type: ADD_EMPLOYEE,
    payload: employee,
  });
  
  export const deleteEmployee = (id) => ({
    type: DELETE_EMPLOYEE,
    payload: id,
  });
  
  export const editEmployee = (employee) => ({
    type: EDIT_EMPLOYEE,
    payload: employee,
  });

  export const setCurrentEmployee = (employee) => ({
    type: SET_CURRENT_EMPLOYEE,
    payload: employee,
  });

  export const clearCurrentEmployee = () => ({
    type: CLEAR_CURRENT_EMPLOYEE,
  });