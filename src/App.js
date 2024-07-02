import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './NavBar';
import Home from './Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SingnUp';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';

function App() {
  return (
    <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact  element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/employees/edit/:id" element={<AddEmployee />}  />
                <Route path="/employees" element={<EmployeeList />} />
            </Routes>
        </Router>
  );
}

export default App;
