import { useEffect, useState } from "react";
import "./style.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [mode, setMode] = useState("landing");
  const [message, setMessage] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);

  const [resourceData, setResourceData] = useState({
    title: "",
    url: "",
    description: "",
    type: "article",
    tags: "",
    priority: "medium",
  });

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setMode("dashboard");
      fetchResources();
    }
  }, []);

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResourceChange = (e) => {
    setResourceData({
      ...resourceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Account created successfully. Please login now.");
      setMode("login");

      setRegisterData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage("Something went wrong while registering");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setMode("dashboard");
      setMessage("Login successful");

      setLoginData({
        email: "",
        password: "",
      });

      fetchResources();
    } catch (error) {
      setMessage("Something went wrong while logging in");
    }
  };

  const fetchResources = async () => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/resources`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to load resources");
        return;
      }

      setResources(data.resources);
    } catch (error) {
      setMessage("Something went wrong while loading resources");
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = getToken();

      const formattedTags = resourceData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const response = await fetch(`${API_URL}/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...resourceData,
          tags: formattedTags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to save resource");
        return;
      }

      setMessage("Resource saved successfully");

      setResourceData({
        title: "",
        url: "",
        description: "",
        type: "article",
        tags: "",
        priority: "medium",
      });

      fetchResources();
    } catch (error) {
      setMessage("Something went wrong while saving resource");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setResources([]);
    setMode("landing");
    setMessage("Logged out successfully");
  };

  return (
    <div className="app">
      {mode === "landing" && (
        <div className="hero">
          <div className="hero-content">
            <p className="badge">Recall</p>
            <h1>Save what you learn. Review it at the right time.</h1>
            <p className="subtitle">
              A full-stack learning resource manager for saving articles,
              videos, coding problems, interview notes, and backend concepts.
            </p>

            <div className="hero-actions">
              <button onClick={() => setMode("register")}>Get Started</button>
              <button className="secondary-btn" onClick={() => setMode("login")}>
                Login
              </button>
            </div>

            {message && <p className="message">{message}</p>}
          </div>
        </div>
      )}

      {mode === "register" && (
        <div className="auth-container">
          <form className="auth-card" onSubmit={handleRegister}>
            <h2>Create account</h2>
            <p>Start saving your learning resources.</p>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />

            <button type="submit">Register</button>

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      )}

      {mode === "login" && (
        <div className="auth-container">
          <form className="auth-card" onSubmit={handleLogin}>
            <h2>Welcome back</h2>
            <p>Login to open your Recall dashboard.</p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button type="submit">Login</button>

            <p className="switch-text">
              New here? <span onClick={() => setMode("register")}>Register</span>
            </p>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      )}

      {mode === "dashboard" && (
        <div className="dashboard">
          <div className="dashboard-header">
            <div>
              <p className="badge">Dashboard</p>
              <h1>Welcome back, {user?.name}</h1>
              <p>Save articles, videos, coding problems, and interview notes.</p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {message && <p className="message">{message}</p>}

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{resources.length}</h3>
              <p>Total Resources</p>
            </div>

            <div className="stat-card">
              <h3>
                {resources.filter((resource) => resource.priority === "high").length}
              </h3>
              <p>High Priority</p>
            </div>

            <div className="stat-card">
              <h3>
                {resources.filter((resource) => resource.type === "video").length}
              </h3>
              <p>Videos Saved</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <form className="create-panel" onSubmit={handleCreateResource}>
              <h2>Save a new resource</h2>
              <p>Add a learning resource you want to revise later.</p>

              <input
                type="text"
                name="title"
                placeholder="Resource title"
                value={resourceData.title}
                onChange={handleResourceChange}
                required
              />

              <input
                type="url"
                name="url"
                placeholder="Resource URL"
                value={resourceData.url}
                onChange={handleResourceChange}
                required
              />

              <textarea
                name="description"
                placeholder="Short description"
                value={resourceData.description}
                onChange={handleResourceChange}
              ></textarea>

              <select
                name="type"
                value={resourceData.type}
                onChange={handleResourceChange}
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="problem">Coding Problem</option>
                <option value="note">Note</option>
                <option value="documentation">Documentation</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="tags"
                placeholder="Tags: backend, jwt, interview"
                value={resourceData.tags}
                onChange={handleResourceChange}
              />

              <select
                name="priority"
                value={resourceData.priority}
                onChange={handleResourceChange}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <button type="submit">Save Resource</button>
            </form>

            <div className="resources-panel">
              <div className="panel-header">
                <div>
                  <h2>Saved Resources</h2>
                  <p>Your learning resources from MongoDB.</p>
                </div>

                <button className="secondary-btn" onClick={fetchResources}>
                  Refresh
                </button>
              </div>

              {resources.length === 0 ? (
                <div className="empty-state">
                  <h3>No resources saved yet</h3>
                  <p>Save your first article, video, problem, or note.</p>
                </div>
              ) : (
                <div className="resource-list">
                  {resources.map((resource) => (
                    <div className="resource-card" key={resource._id}>
                      <div className="resource-top">
                        <span className="type-badge">{resource.type}</span>
                        <span className={`priority ${resource.priority}`}>
                          {resource.priority}
                        </span>
                      </div>

                      <h3>{resource.title}</h3>

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-link"
                      >
                        Open Resource
                      </a>

                      <p>{resource.description}</p>

                      <div className="tag-row">
                        {resource.tags?.map((tag, index) => (
                          <span className="tag" key={index}>
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="resource-footer">
                        <span>
                          Review:{" "}
                          {new Date(resource.reviewDate).toLocaleDateString()}
                        </span>
                        <span>Reviews: {resource.reviewCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;