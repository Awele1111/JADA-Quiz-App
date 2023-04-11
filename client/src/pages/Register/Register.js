import React, { useState } from "react";
import "./register.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

export const Register = (props) => {
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && username && password) {
      try {
        const { data } = await addUser({
          variables: { email, password, username },
        });

        Auth.login(data.addUser.token);
      } catch (e) {
        document.getElementById("registerUsernameError").innerHTML = "";
        document.getElementById("registerEmailError").innerHTML = "";
        if (e.message.includes("E11000") && e.message.includes("username")) {
          document.getElementById("registerUsernameError").innerHTML = "This Username is already taken!";
        } else if (e.message.includes("E11000") && e.message.includes("email")) {
          document.getElementById("registerEmailError").innerHTML = "This Email is already taken!";
        } else if (e.message.includes("email")) {
          document.getElementById("registerEmailError").innerHTML = "Your email is not a proper email address!";
        }
      }
    }
  };

  return (
    <div className="register-body">
      <main className="register-body">
        <div className="auth-form-container">
          <h2 className="register-h2">Register</h2>
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
            <div id="registerUsernameError"></div>
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
            <div id="registerEmailError"></div>
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
      </main>
    </div>
  );
};

export default Register;
