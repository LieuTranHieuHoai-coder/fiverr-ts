import React, { useState } from "react";
import "./login.scss";
import { authSignIn } from "../../apis/apiAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await authSignIn({ email: email, password: password });
      localStorage.setItem("currentUser", JSON.stringify(res));
      navigate("/")
    } catch (err:any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">email</label>
        <input
          name="email"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setemail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
