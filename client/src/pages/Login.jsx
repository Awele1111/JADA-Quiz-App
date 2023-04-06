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
        <body>

        <div className="auth-form-container">
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email here" id="email" name="email" />
            <label htmlFor="password">Password:</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Login</button>
        </form>

        <button onClick={() => window.location.assign('/signup')}>Don't have an account? signup/register here</button>
        </div>
        </body>
    )
}