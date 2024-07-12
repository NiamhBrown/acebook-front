import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    password: [
      "Password must be at least 8 characters.",
      "Password must have at least one capital letter.",
      "Password must contain a special character."
    ],
});

  const handleSubmit = async (event) => {
    alert("pressed!")
    event.preventDefault();
    if (errors.password.length === 0){
    try {
      await signup(forename, surname, username, email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }}
  };

  useEffect(() => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
    const validatePassword = () => {
      let updatedErrors = [
        "Password must be at least 8 characters.",
        "Password must have at least one capital letter.",
        "Password must contain a special character."
      ];
  
      if (password.length >= 8) {
        updatedErrors = updatedErrors.filter(
          (error) => error !== "Password must be at least 8 characters."
        );
      }
      //test method of a regular expression checks if there's at least one match of the pattern in the argument given
      if (capitalLetterRegex.test(password)) {
        updatedErrors = updatedErrors.filter(
          (error) => error !== "Password must have at least one capital letter."
        );
      }
      if (specialCharacterRegex.test(password)) {
        updatedErrors = updatedErrors.filter(
          (error) => error !== "Password must contain a special character."
        );
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: updatedErrors,
      }));
    };
  
    validatePassword(); //call function explicitly to execute

  }, [password]);
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  return (
    <>
      <h1 className="heading">Acebook</h1>
      <h2>Signup</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="forename">Forename:</label>
        <input
          id="forename"
          type="text"
          value={forename} //creates a controlled input component, no longer managed by browser's DOM
          autoComplete="off"
          onChange={(event) => setForename(event.target.value)}
        />

        <label htmlFor="surname">Surname:</label>
        <input
          id="surname"
          type="text"
          value={surname}
          autoComplete="off"
          onChange={(event) => setSurname(event.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          autoComplete="off"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          autoComplete="off"
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          />

      {errors.password.length > 0 && (
        <ul>
          {errors.password.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <input className="login-button" role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div>
      <span>Already have an account? <a className="hyperlink" href="/login">Log in</a></span>
      </div>
    </>
  );
};
