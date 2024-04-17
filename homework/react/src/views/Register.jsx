import { Link } from "react-router-dom";

export default function Register() {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-signup-form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">PHP Homework - Conferences</h1>
                    <input placeholder="Username"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                    ></input>
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already registered?
                        <Link to="/login"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
