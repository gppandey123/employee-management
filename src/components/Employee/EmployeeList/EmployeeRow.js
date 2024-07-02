import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './employeeRow.css';
import { deleteEmployee, setCurrentEmployee } from '../../../redux/actions/employeeActions';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Shared/ConfirmationModal';

const EmployeeRow = ({ employee }) => {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteEmployee(employee.id));
        setShowModal(false);
    };


    const handleEdit = () => {
        dispatch(setCurrentEmployee(employee));
        navigate(`/employees/edit/${employee.id}`);
    };

    return (
        <>
            <tr>
                <td>{employee.name}</td>
                <td>{employee.email} </td>
                <td>{employee.dob}</td>
                <td>{employee.salary}</td>
                <td>{employee.atWork ? 'Yes' : 'No'}</td>
                <td>
                    <button className="action-button edit-button" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="action-button view-button" onClick={() => setShowViewModal(true)}>
                        View
                    </button>
                    <button className="action-button delete-button" onClick={() => setShowModal(true)}>Delete</button>
                </td>
            </tr>
             <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                employee={employee}
            />
            <ConfirmationModal
                show={showViewModal}
                onClose={() => setShowViewModal(false)}
                onConfirm={handleDelete}
                employee={employee}
                view={true}
            />
        </>
    );
};

export default EmployeeRow;