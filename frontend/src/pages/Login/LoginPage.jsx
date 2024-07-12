import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import "../../../css/post.css"
import "../../../css/main.css"

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseFromLogin = await login(email, password);
      localStorage.setItem("token", responseFromLogin.token);
      localStorage.setItem("userId", responseFromLogin.userId);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1 className="heading">Acebook</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className="login-button" role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div>
        <span>Don't have an account? <a className="hyperlink" href="/signup">Sign up</a></span>
      </div>
    </>
  );
};
