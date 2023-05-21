import React, { useState } from "react";
import axios from "axios";

const ExpenseRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleWarehouseNameChange = (event) => {
    setWarehouseName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          name,
          email,
          password,
          warehouseName,
        }
      );

      setName("");
      setEmail("");
      setPassword("");
      setWarehouseName("");
      setSuccessMessage("Register berhasil");
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to register");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {successMessage && (
        <p>
          Silahkan <a href="http://localhost:3000/login">login disini</a>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
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
        <div>
          <label>Warehouse Name:</label>
          <input
            type="text"
            value={warehouseName}
            onChange={handleWarehouseNameChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ExpenseRegister;
