import { ADD_EMPLOYEE, CLEAR_CURRENT_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, SET_CURRENT_EMPLOYEE } from "../constant";

const initialState = {
  employeeList: [],
  currentEmployee: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employeeList: [...state.employeeList, action.payload],
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.filter(employee => employee.id !== action.payload),
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    case SET_CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.payload,
      };
    case CLEAR_CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: null,
      };
    default:
      return state;
  }
};

export default employeeReducer;