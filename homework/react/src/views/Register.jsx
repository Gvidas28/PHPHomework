import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ServerClient from "../ServerClient";
import { useStateContext } from "../ContextProvider";

export default function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const request = {
            name: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: repeatPasswordRef.current.value,
        };

        ServerClient.post("/register", request)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error.response.data.errors);
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
                    <input ref={usernameRef} placeholder="Username"></input>
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
                    <input
                        ref={repeatPasswordRef}
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
