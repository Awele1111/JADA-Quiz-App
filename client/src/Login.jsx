import React, { useState } from "react"

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  handleSubmit = (e) =>  {
        e.preventDefault();
        console.log(email);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="type your email here" id="email" name="email" />
            <label htmlFor="password">email</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button>Login</button>
        </form>
        <button>Don't have an account? Signup/Register here</button>
        </>
    )
}