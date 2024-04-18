import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ServerClient from "../ServerClient";
import { useStateContext } from "../ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const request = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        ServerClient.post("/login", request)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({
                        email: [error.response.data.message],
                    });
                }
            });
    };

    return (
        <div className="login-signup-form">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">PHP Homework - Conferences</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                    ></input>
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    ></input>
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
