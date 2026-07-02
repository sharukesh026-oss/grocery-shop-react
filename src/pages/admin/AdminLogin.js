import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/admin/login", {
        username: username,
        password: password
      });

      if (response.data === "Login Success") {

        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("username", username);

        alert("Login Successful");

        navigate("/admin/dashboard");

      } else {

        alert("Invalid Username or Password");

      }

    } catch (error) {

      console.error(error);
      alert("Login Failed");

    }

  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;