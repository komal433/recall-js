import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

function App() {
  const [mode, setMode] = useState("landing");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [recalls, setRecalls] = useState([]);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [recallData, setRecallData] = useState({
    title: "",
    content: "",
    category: "General",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setMode("dashboard");
      fetchRecalls();
    }
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchRecalls = async () => {
    try {
      const token = getToken();

      const res = await fetch(`${API_URL}/recalls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to fetch recalls");
        return;
      }

      setRecalls(data.recalls || []);
    } catch (error) {
      setMessage("Unable to load recalls");
    }
  };

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

      setUser(data.user);
      setMode("dashboard");
      setMessage("Login successful");
      fetchRecalls();
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecall = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = getToken();

      const res = await fetch(`${API_URL}/recalls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recallData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to create recall");
        return;
      }

      setMessage("Recall created successfully");
      setRecallData({
        title: "",
        content: "",
        category: "General",
      });

      fetchRecalls();
    } catch (error) {
      setMessage("Something went wrong while creating recall");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setRecalls([]);
    setMode("landing");
    setMessage("Logged out successfully");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => setMode("landing")}>
          Recall
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <button onClick={() => setMode("dashboard")}>Dashboard</button>
              <button className="secondary-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setMode("landing")}>Home</button>
              <button onClick={() => setMode("login")}>Login</button>
              <button className="primary-btn" onClick={() => setMode("register")}>
                Get Started
              </button>
            </>
          )}
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

      {mode === "dashboard" && user && (
        <main className="dashboard">
          <section className="dashboard-header">
            <div>
              <p className="badge">Your personal recall space</p>
              <h1>Welcome back, {user.name}</h1>
              <p>
                Create, organize, and revisit your most important learning notes.
              </p>
            </div>

            <div className="dashboard-stat">
              <h2>{recalls.length}</h2>
              <p>Total Recalls</p>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="create-panel">
              <h2>Create a new recall</h2>
              <p>Save a concept, interview point, or backend learning.</p>

              <form onSubmit={handleCreateRecall}>
                <input
                  type="text"
                  placeholder="Title"
                  value={recallData.title}
                  onChange={(e) =>
                    setRecallData({ ...recallData, title: e.target.value })
                  }
                />

                <textarea
                  placeholder="Write your recall note..."
                  value={recallData.content}
                  onChange={(e) =>
                    setRecallData({ ...recallData, content: e.target.value })
                  }
                ></textarea>

                <input
                  type="text"
                  placeholder="Category"
                  value={recallData.category}
                  onChange={(e) =>
                    setRecallData({ ...recallData, category: e.target.value })
                  }
                />

                <button className="primary-btn full" disabled={loading}>
                  {loading ? "Saving..." : "Save Recall"}
                </button>
              </form>
            </div>

            <div className="recalls-panel">
              <div className="panel-title">
                <h2>Your recalls</h2>
                <button className="secondary-btn" onClick={fetchRecalls}>
                  Refresh
                </button>
              </div>

              {recalls.length === 0 ? (
                <div className="empty-state">
                  <h3>No recalls yet</h3>
                  <p>Create your first recall note from the form.</p>
                </div>
              ) : (
                <div className="recall-list">
                  {recalls.map((recall) => (
                    <article className="recall-card" key={recall._id}>
                      <div className="recall-top">
                        <span>{recall.category || "General"}</span>
                        <small>
                          {new Date(recall.createdAt).toLocaleDateString()}
                        </small>
                      </div>

                      <h3>{recall.title}</h3>
                      <p>{recall.content}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default App;