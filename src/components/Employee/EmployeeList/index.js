import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import EmployeeRow from './EmployeeRow';
import ReactPaginate from 'react-paginate';

const EmployeeList = () => {
    const employeeList = useSelector(state => state.employeeDetail.employeeList);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(employeeList);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;

    useEffect(() => {
        setFilteredEmployees(employeeList);
    }, [employeeList]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (searchQuery.length >= 3) {
                const query = searchQuery.toLowerCase();
                setFilteredEmployees(
                    employeeList.filter(
                        (employee) =>
                            employee.name.toLowerCase().includes(query) ||
                            employee.email.toLowerCase().includes(query)
                    )
                );
            } else {
                setFilteredEmployees(employeeList);
            }
        }, 300); // 300ms delay for debouncing

        return () => clearTimeout(timerId);
    }, [searchQuery, employeeList]);



    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = () => {
        const sortedEmployees = [...filteredEmployees].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredEmployees(sortedEmployees);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentEmployees = filteredEmployees.slice(offset, offset + itemsPerPage);

    return (
        <>
            <div className="employee-list-container">
                <h1>Employee List</h1>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
                {employeeList.length ?
                    <>
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th onClick={handleSort} className={`sortable-header ${sortOrder}`}>Name</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Salary</th>
                                    <th>At Work</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((employee) => (
                                    <EmployeeRow key={employee.id} employee={employee} />
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            /> 
                        </div>
                    </>
                    :
                    <p className='no-data'>No Employe data Present</p>
                }
            </div>
        </>
    )
}

export default EmployeeList;