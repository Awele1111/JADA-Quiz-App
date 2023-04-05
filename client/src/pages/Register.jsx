import React, {useState} from "react";
// import "../css/register.css"
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  handleSubmit = (e) =>  {
        e.preventDefault();
        console.log(email);
    }
    return (
        <body>
        <div className="auth-form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input name="name" id="name" placeholder="Type your full name here"/>
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