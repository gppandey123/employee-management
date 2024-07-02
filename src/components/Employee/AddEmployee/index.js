import React, { useEffect, useState } from 'react'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { validateDateOfBirth, validateEmail } from '../../../utility/utility';
import { addEmployee, editEmployee, clearCurrentEmployee } from '../../../redux/actions/employeeActions';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        salary: '',
        atWork: false
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const currentEmployee = useSelector((state) => state.employeeDetail.currentEmployee);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentEmployee) {
            setFormData(currentEmployee);
        } else {
            setFormData({
                name: '',
                email: '',
                dob: '',
                salary: '',
                atWork: false,
            });
        }
    }, [currentEmployee]);

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggle = () => {
        setFormData({ ...formData, atWork: !formData.atWork });
    };

    const handleSubmit = async (e) => {
        const newErrors = {};
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!(formData.name.length >= 2)) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        if (!validateDateOfBirth(formData.dob)) {
            newErrors.dob = 'Date of Birth cannot be in the future';
        }

        if (!(formData.salary.length >= 5)) {
            newErrors.salary = 'salary must be at least 5 digit long';
        }

        setErrors(newErrors);
        e.preventDefault();
        try {
            if (Object.keys(newErrors).length === 0) {
                if (currentEmployee) {
                    dispatch(editEmployee(formData));
                    navigate("/employees");
                } else {
                    // Generate a unique ID for the new employee
                    const employeeWithId = { ...formData, id: new Date().getTime().toString() };
                    navigate("/employees");
                    dispatch(addEmployee(employeeWithId));
                }
                dispatch(clearCurrentEmployee());
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='add-employee-container'>
            <h1>Add Details</h1>
            <form onSubmit={handleSubmit} className="add-employee-form">
                <div>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={currentEmployee} />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
                    {errors.dob && <p className="error">{errors.dob}</p>}
                </div>
                <div>
                    <input type="number" step="1" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
                    {errors.salary && <p className="error">{errors.salary}</p>}
                </div>
                <label className="checkbox-label">
                    At Work:
                    <input type="checkbox" checked={formData.atWork} onChange={handleToggle} />
                </label>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee;