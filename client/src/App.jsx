import { useState } from "react";

const API_URL = "http://localhost:5000/api";

function App() {
  const [mode, setMode] = useState("landing");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Account created successfully. Please login now.");
      setMode("login");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful. Dashboard will be built on Day 17.");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Recall</div>

        <div className="nav-actions">
          <button onClick={() => setMode("landing")}>Home</button>
          <button onClick={() => setMode("login")}>Login</button>
          <button className="primary-btn" onClick={() => setMode("register")}>
            Get Started
          </button>
        </div>
      </nav>

      {mode === "landing" && (
        <main className="hero">
          <section className="hero-content">
            <p className="badge">Backend-powered learning vault</p>

            <h1>
              Store what you learn.
              <br />
              Recall it when it matters.
            </h1>

            <p className="hero-text">
              Recall helps you save important concepts, interview notes, backend
              learnings, and revision points in one secure place.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn large" onClick={() => setMode("register")}>
                Start Building Memory
              </button>
              <button className="secondary-btn large" onClick={() => setMode("login")}>
                Login
              </button>
            </div>

            <div className="stats">
              <div>
                <h3>JWT</h3>
                <p>Secure Auth</p>
              </div>
              <div>
                <h3>MongoDB</h3>
                <p>Cloud Storage</p>
              </div>
              <div>
                <h3>CRUD</h3>
                <p>User Recalls</p>
              </div>
            </div>
          </section>

          <section className="preview-card">
            <div className="card-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="note-card">
              <p className="note-category">Backend</p>
              <h2>JWT Authentication</h2>
              <p>
                JWT is used for stateless authentication. After login, the
                client stores a token and sends it with protected requests.
              </p>
            </div>

            <div className="note-card faded">
              <p className="note-category">Interview</p>
              <h2>Ownership Checks</h2>
              <p>
                Users can only access, update, or delete the recalls that belong
                to them.
              </p>
            </div>
          </section>
        </main>
      )}

      {mode === "register" && (
        <section className="auth-page">
          <div className="auth-card">
            <h2>Create your Recall account</h2>
            <p>Start saving your learning notes securely.</p>

            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Full name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email address"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />

              <button className="primary-btn full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>
          </div>
        </section>
      )}

      {mode === "login" && (
        <section className="auth-page">
          <div className="auth-card">
            <h2>Welcome back</h2>
            <p>Login to access your recall dashboard.</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <button className="primary-btn full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="switch-text">
              New to Recall?{" "}
              <span onClick={() => setMode("register")}>Create account</span>
            </p>
          </div>
        </section>
      )}

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default App;