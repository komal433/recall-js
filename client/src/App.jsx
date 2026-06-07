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
  const [todayResources, setTodayResources] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const [resourceData, setResourceData] = useState({
    title: "",
    url: "",
    description: "",
    type: "article",
    tags: "",
    priority: "medium",
  });

  const [filters, setFilters] = useState({
    type: "",
    priority: "",
    tag: "",
  });

  const [editingResourceId, setEditingResourceId] = useState(null);

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
      fetchTodayResources();
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

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
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
      fetchTodayResources();
    } catch (error) {
      setMessage("Something went wrong while logging in");
    }
  };

  const fetchResources = async (customFilters = filters) => {
    try {
      const token = getToken();

      const queryParams = new URLSearchParams();

      if (customFilters.type) {
        queryParams.append("type", customFilters.type);
      }

      if (customFilters.priority) {
        queryParams.append("priority", customFilters.priority);
      }

      if (customFilters.tag) {
        queryParams.append("tag", customFilters.tag);
      }

      const queryString = queryParams.toString();

      const response = await fetch(
        `${API_URL}/resources${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const fetchTodayResources = async () => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/resources/today`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to load today's recalls");
        return;
      }

      setTodayResources(data.resources);
    } catch (error) {
      setMessage("Something went wrong while loading today's recalls");
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
      fetchTodayResources();
    } catch (error) {
      setMessage("Something went wrong while saving resource");
    }
  };

  const handleEditClick = (resource) => {
    setEditingResourceId(resource._id);

    setResourceData({
      title: resource.title,
      url: resource.url,
      description: resource.description,
      type: resource.type,
      tags: resource.tags.join(", "),
      priority: resource.priority,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = getToken();

      const formattedTags = resourceData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const response = await fetch(`${API_URL}/resources/${editingResourceId}`, {
        method: "PUT",
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
        setMessage(data.message || "Unable to update resource");
        return;
      }

      setMessage("Resource updated successfully");
      setEditingResourceId(null);

      setResourceData({
        title: "",
        url: "",
        description: "",
        type: "article",
        tags: "",
        priority: "medium",
      });

      fetchResources();
      fetchTodayResources();
    } catch (error) {
      setMessage("Something went wrong while updating resource");
    }
  };

  const handleDeleteResource = async (resourceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to delete resource");
        return;
      }

      setMessage("Resource deleted successfully");
      fetchResources();
      fetchTodayResources();
    } catch (error) {
      setMessage("Something went wrong while deleting resource");
    }
  };

  const handleMarkReviewed = async (resourceId) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/resources/${resourceId}/review`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to mark resource as reviewed");
        return;
      }

      setMessage("Resource marked as reviewed");

      fetchResources();
      fetchTodayResources();
    } catch (error) {
      setMessage("Something went wrong while marking resource as reviewed");
    }
  };

  const clearEditForm = () => {
    setEditingResourceId(null);

    setResourceData({
      title: "",
      url: "",
      description: "",
      type: "article",
      tags: "",
      priority: "medium",
    });
  };

  const clearFilters = () => {
    const emptyFilters = {
      type: "",
      priority: "",
      tag: "",
    };

    setFilters(emptyFilters);
    fetchResources(emptyFilters);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setResources([]);
    setTodayResources([]);
    setMode("landing");
    setMessage("Logged out successfully");
  };

  const displayedResources = activeTab === "all" ? resources : todayResources;

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
                {
                  resources.filter(
                    (resource) => resource.priority === "high"
                  ).length
                }
              </h3>
              <p>High Priority</p>
            </div>

            <div className="stat-card">
              <h3>
                {
                  resources.filter((resource) => resource.type === "video")
                    .length
                }
              </h3>
              <p>Videos Saved</p>
            </div>

            <div className="stat-card">
              <h3>{todayResources.length}</h3>
              <p>Due Today</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <form
              className="create-panel"
              onSubmit={
                editingResourceId ? handleUpdateResource : handleCreateResource
              }
            >
              <h2>
                {editingResourceId ? "Edit resource" : "Save a new resource"}
              </h2>

              <p>
                {editingResourceId
                  ? "Update your saved learning resource."
                  : "Add a learning resource you want to revise later."}
              </p>

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

              <button type="submit">
                {editingResourceId ? "Update Resource" : "Save Resource"}
              </button>

              {editingResourceId && (
                <button type="button" className="cancel-btn" onClick={clearEditForm}>
                  Cancel Edit
                </button>
              )}
            </form>

            <div className="resources-panel">
              <div className="dashboard-tabs">
                <button
                  className={activeTab === "all" ? "tab-btn active" : "tab-btn"}
                  onClick={() => {
                    setActiveTab("all");
                    fetchResources();
                  }}
                >
                  All Resources
                </button>

                <button
                  className={
                    activeTab === "today" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => {
                    setActiveTab("today");
                    fetchTodayResources();
                  }}
                >
                  Today's Recall
                </button>
              </div>

              <div className="panel-header">
                <div>
                  <h2>
                    {activeTab === "all"
                      ? "Saved Resources"
                      : "Today's Recall"}
                  </h2>
                  <p>
                    {activeTab === "all"
                      ? "Your learning resources from MongoDB."
                      : "Resources due today or overdue for review."}
                  </p>
                </div>

                <button
                  className="secondary-btn"
                  onClick={
                    activeTab === "all" ? fetchResources : fetchTodayResources
                  }
                >
                  Refresh
                </button>
              </div>

              {activeTab === "all" && (
                <div className="filter-box">
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="problem">Coding Problem</option>
                    <option value="note">Note</option>
                    <option value="documentation">Documentation</option>
                    <option value="other">Other</option>
                  </select>

                  <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <input
                    type="text"
                    name="tag"
                    placeholder="Filter by tag"
                    value={filters.tag}
                    onChange={handleFilterChange}
                  />

                  <button className="secondary-btn" onClick={() => fetchResources()}>
                    Apply Filters
                  </button>

                  <button className="secondary-btn" onClick={clearFilters}>
                    Clear
                  </button>
                </div>
              )}

              {displayedResources.length === 0 ? (
                <div className="empty-state">
                  <h3>
                    {activeTab === "all"
                      ? "No resources found"
                      : "No recalls due today"}
                  </h3>
                  <p>
                    {activeTab === "all"
                      ? "Save a new resource or clear filters."
                      : "You are done for today. Reviewed resources will appear later."}
                  </p>
                </div>
              ) : (
                <div className="resource-list">
                  {displayedResources.map((resource) => (
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

                      <div className="resource-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEditClick(resource)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteResource(resource._id)}
                        >
                          Delete
                        </button>

                        {activeTab === "today" && (
                          <button
                            className="review-btn"
                            onClick={() => handleMarkReviewed(resource._id)}
                          >
                            Mark Reviewed
                          </button>
                        )}
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