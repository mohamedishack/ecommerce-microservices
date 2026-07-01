import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { register } from "../services/AuthService";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        if (form.password !== form.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            await register({
                email: form.email,
                password: form.password,
            });
            alert("Registration successful");

            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <AuthLayout>
            <h3>Register</h3>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={handleRegister}>
                Register
            </button>

            <p>
                Already have an account?

                <Link to="/"> Login</Link>
            </p>

        </AuthLayout>
    );
}

export default Register;