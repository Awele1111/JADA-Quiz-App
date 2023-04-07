// import React, {useState} from "react";
// import "../css/register.css";
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";
// import Auth from '../utils/auth';

// export const Register = (props) => {
//     const [addUser, { error, data }] = useMutation(ADD_USER);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');

//     const  handleSubmit = async (e) =>  {
//         e.preventDefault();
//         console.log(email);

//         try {
//             const { data } = await addUser({
//                 variables: { email, password, username }
//             });
            
//             Auth.login(data.addUser.token);

//         } catch (e) {
//             console.error(e);
//         }
//     }
//     return (
//         <div className="register-body">
//         <body className="register-body">
//         <div className="auth-form-container">
//         <h2 className="register-h2">Register</h2>
//         <form className="register-form"onSubmit={handleSubmit}>
//             <label className="register-label" htmlFor="name">Username</label>
//             <input className="register-input"   name="name" value={username} onChange={(e) => setUsername(e.target.value)} id="name" placeholder="Type your username here"/>
//             <label className="register-label" value="name" htmlFor="email">Email Address</label>
//             <input className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email here" id="email" name="email" />
//             <label className="register-label" htmlFor="password">Password</label>
//             <input className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//             <button className="register-button" type="submit">Register/signup</button>
//         </form>
        
//         <button className="link-button" onClick={() => window.location.assign('/login')}>Already have an account? Login here</button>
//         </div>
//     </body>
//     </div>
//     )
// }

// const Register = (props) => {
//     const [addUser, { error, data }] = useMutation(ADD_USER);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await addUser({
//                 variables: { email, password, username }
//             });
//             Auth.login(data.addUser.token);
//         } catch (e) {
//             console.error(e);
//             if (e.graphQLErrors.length > 0) {
//                 const errorMessage = e.graphQLErrors[0].message;
//                 setErrorMessage(errorMessage);
//             } else {
//                 setErrorMessage("An error occurred during registration. Please try again.");
//             }
//         }
//     }

//     return (
//         <div className="register-body">
//             <body className="register-body">
//                 <div className="auth-form-container">
//                     <h2 className="register-h2">Register</h2>
//                     <form className="register-form" onSubmit={handleSubmit}>
//                         {errorMessage && <p className="error-message">{errorMessage}</p>}
//                         <label className="register-label" htmlFor="name">Username</label>
//                         <input className="register-input" name="name" value={username} onChange={(e) => setUsername(e.target.value)} id="name" placeholder="Type your username here" />
//                         <label className="register-label" value="name" htmlFor="email">Email Address</label>
//                         <input className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email here" id="email" name="email" />
//                         <label className="register-label" htmlFor="password">Password</label>
//                         <input className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//                         <button className="register-button" type="submit">Register/signup</button>
//                     </form>
//                     <button className="link-button" onClick={() => window.location.assign('/login')}>Already have an account? Login here</button>
//                 </div>
//             </body>
//         </div>
//     )
// }

import React, { useState } from "react";
import "../css/register.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export const Register = (props) => {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { email, password, username },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setErrorMessage(e.message);
    }
  };

  let emailError = "";
  let passwordError = "";
  let usernameError = "";

  if (error) {
    const errorMessages = error.graphQLErrors.map((err) => err.message);
    errorMessages.forEach((msg) => {
      if (msg.includes("email")) {
        emailError = msg;
      } else if (msg.includes("password")) {
        passwordError = msg;
      } else if (msg.includes("username")) {
        usernameError = msg;
      } else {
        setErrorMessage(msg);
      }
    });
  }

  return (
    <div className="register-body">
      <body className="register-body">
        <div className="auth-form-container">
          <h2 className="register-h2">Register</h2>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-label" htmlFor="name">
              Username
            </label>
            <input
              className="register-input"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="name"
              placeholder="Type your username here"
            />
            {usernameError && (
              <p className="error-message">{usernameError}</p>
            )}
            <label className="register-label" value="name" htmlFor="email">
              Email Address
            </label>
            <input
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Type your email here"
              id="email"
              name="email"
            />
            {emailError && (
              <p className="error-message">{emailError}</p>
            )}
            <label className="register-label" htmlFor="password">
              Password
            </label>
            <input
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            {passwordError && (
              <p className="error-message">{passwordError}</p>
            )}
            <button className="register-button" type="submit">
              Register/signup
            </button>
          </form>

          <button
            className="link-button"
            onClick={() => window.location.assign("/login")}
          >
            Already have an account? Login here
          </button>
        </div>
      </body>
    </div>
  );
};
