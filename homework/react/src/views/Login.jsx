import { Link } from "react-router-dom";

export default function Login() {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-signup-form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">PHP Homework - Conferences</h1>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered?
                        <Link to="/register"> Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
