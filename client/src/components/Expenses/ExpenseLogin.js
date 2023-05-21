import React, { useState } from "react";
import axios from "axios";

const ExpenseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      // Simpan token ke penyimpanan lokal (localStorage atau session storage)
      localStorage.setItem("token", response.data.data.token);

      // Redirect ke halaman localhost:3000 setelah login berhasil
      window.location.href = "http://localhost:3000";
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default ExpenseLogin;
