import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../utility/utility';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
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

        if (!(formData.name.length >= 2)) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        if (!(formData.password.length >= 6)) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        try {
            // Perform sign-up logic (e.g., API call)
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
        <h1>Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <input type="text"
                placeholder='Enter Your Email'
                name="email"
                onChange={hanldeChange}
            />
             {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
            <input type="text"
                placeholder='Enter Your Name'
                name="name"
                onChange={hanldeChange}
            />
             {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
            <input type="password"
                placeholder='Enter you password'
                name="password"
                onChange={hanldeChange}
            />
             {errors.password && <p className="error">{errors.password}</p>}
        </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    )
}

export default SignUp;