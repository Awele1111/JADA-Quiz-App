
// import React, { useState } from "react";
// import "../css/register.css";
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

// export const Register = (props) => {
//   const [addUser, { error, data }] = useMutation(ADD_USER);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(email);

//     if (email && username && password) {
//       try {
//         const { data } = await addUser({
//           variables: { email, password, username },
//         });

//         Auth.login(data.addUser.token);
//       } catch (e) {
//         document.getElementById("registerUsernameError").innerHTML = "";
//         document.getElementById("registerEmailError").innerHTML = "";
//         console.log(e.message);
//         if (e.message.includes("E11000") && e.message.includes("username")) {
//           console.log("This Username is already taken!");
//           document.getElementById("registerUsernameError").innerHTML =
//             "This Username is already taken!";
//         } else if (e.message.includes("E11000") && e.message.includes("email")) {
//           console.log("This Email is already taken!");
//           document.getElementById("registerEmailError").innerHTML =
//             "This Email is already taken!";
//         } else if (e.message.includes("email")) {
//           console.log("Your email is not a proper email address!");
//           document.getElementById("registerEmailError").innerHTML =
//             "Your email is not a proper email address!";
//         } else {
//           console.log("An error occurred. Please try again.");
//         }
//       }
//     } else {
//       console.log("All users require a username, password, and email");
//     }
//   };

//   return (
//     <div className="register-body">
//       <body className="register-body">
//         <div className="auth-form-container">
//           <h2 className="register-h2">Register</h2>
//           <form className="register-form" onSubmit={handleSubmit}>
//             <label className="register-label" htmlFor="name">
//               Username
//             </label>
//             <input
//               className="register-input"
//               name="name"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               id="name"
//               placeholder="Type your username here"
//             />
//             <div id="registerUsernameError"></div>
//             <label className="register-label" value="name" htmlFor="email">
//               Email Address
//             </label>
//             <input
//               className="register-input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Type your email here"
//               id="email"
//               name="email"
//             />
//             <div id="registerEmailError"></div>
//             <label className="register-label" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="register-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="********"
//               id="password"
//               name="password"
//             />
//             <button className="register-button" type="submit">
//               Register/signup
//             </button>
//           </form>

//           <button
//             className="link-button"
//             onClick={() => window.location.assign("/login")}
//           >
//             Already have an account? Login here
//           </button>
//         </div>
//       </body>
//     </div>
//   );
// };


import React, { useState } from "react";
import "../css/register.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export const Register = (props) => {
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    if (email && username && password) {
      try {
        const { data } = await addUser({
          variables: { email, password, username },
        });

        Auth.login(data.addUser.token);
      } catch (e) {
        document.getElementById("registerUsernameError").innerHTML = "";
        document.getElementById("registerEmailError").innerHTML = "";
        console.log(e.message);
        if (e.message.includes("E11000") && e.message.includes("username")) {
          console.log("This Username is already taken!");
          document.getElementById("registerUsernameError").innerHTML =
            "This Username is already taken!";
        } else if (e.message.includes("E11000") && e.message.includes("email")) {
          console.log("This Email is already taken!");
          document.getElementById("registerEmailError").innerHTML =
            "This Email is already taken!";
        } else if (e.message.includes("email")) {
          console.log("Your email is not a proper email address!");
          document.getElementById("registerEmailError").innerHTML =
            "Your email is not a proper email address!";
        } else {
          console.log("An error occurred. Please try again.");
        }
      }
    } else {
      console.log("All users require a username, password, and email");
    }
  };

  return (
    <div className="register-body">
      <body className="register-body">
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
      </body>
    </div>
  );
};

export default Register;
