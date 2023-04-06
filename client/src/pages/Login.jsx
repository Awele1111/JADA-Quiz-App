import React, { useState } from "react"
import "../css/login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

export const Login = (props ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const  handleSubmit = async (e) =>  {
        e.preventDefault();
       
        try {
            const { data } = await login({
                variables: { email, password }
            });
            
            Auth.login(data.login.token);

        } catch (e) {
            console.error(e);
        }
        
    }
    return (

        <div className="login-body">
        <body className="login-body">

        <div className="auth-form-container">
            <h2 className="login-h2">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label" htmlFor="email">Email Address:</label>
            <input className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email here" id="email" name="email" />
            <label className="login-label-p" htmlFor="password">Password:</label>
            <input className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button className="login-button" type="submit">Login</button>
        </form>

        <button className="link-button" onClick={() => window.location.assign('/signup')}>Don't have an account? signup/register here</button>
        </div>
        </body>
        </div>
    )
}