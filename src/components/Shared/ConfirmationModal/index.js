import React from 'react';
import './style.css';

const ConfirmationModal = ({ show, onClose, onConfirm, employee, view = false  }) => {
    if (!show) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{view ? 'Employee Details' : 'Confirm Deletion'}</h2>
                </div>
                <div className="modal-body">
                    {!view && <p>Are you sure you want to delete {employee.name}?</p>}
                    {view && <p><strong>Date of Birth:</strong> {employee.dob}</p>}
                    {view && <p><strong>Salary:</strong>{employee.salary}<span>₹</span></p>}
                </div>
                <div className="modal-footer">
                    <button className="modal-button cancel-button" onClick={onClose}>Close</button>
                    {!view && <button className="modal-button confirm-button" onClick={onConfirm}>Confirm</button>}
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
