import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import { validateEmail } from '../../../utility/utility';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const hanldeChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setFormData({ ...formData, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!(formData.password.length >= 6)) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);

        try {
            // Perform sign-in logic (e.g., API call)
            // On success, navigate to the Home page
            if (Object.keys(newErrors).length === 0) {
                localStorage.setItem('token', "pandeyji");
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="auth-container">
            <h1 >Login</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <div>
                    <input type="text"
                        placeholder='Enter Your Email'
                        name="email"
                        onChange={hanldeChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <input type="password"
                        placeholder='Enter you password'
                        name="password"
                        onChange={hanldeChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default Login