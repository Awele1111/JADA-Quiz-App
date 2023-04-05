import React, { useState } from "react"
// import "../css/login.css"

export const Login = (props ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  handleSubmit = (e) =>  {
        e.preventDefault();
        console.log(email);
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