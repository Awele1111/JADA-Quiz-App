import React, {useState} from "react";
// import "../css/register.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';

export const Register = (props) => {
    const [addUser, { error, data }] = useMutation(ADD_USER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const  handleSubmit = async (e) =>  {
        e.preventDefault();
        console.log(email);

        try {
            const { data } = await addUser({
                variables: { email, password, username }
            });
            
            Auth.login(data.addUser.token);

        } catch (e) {
            console.error(e);
        }
    }
    return (
        <body>
        <div className="auth-form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <input name="name" value={username} onChange={(e) => setUsername(e.target.value)} id="name" placeholder="Type your username here"/>
            <label value="name" htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email here" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register/signup</button>
        </form>
        
        <button onClick={() => window.location.assign('/login')}>Already have an account? Login here</button>
        </div>
    </body>
    )
}