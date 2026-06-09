const API_URL = "http://127.0.0.1:5000/api";

const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const descriptionInput = document.getElementById("description");
const typeInput = document.getElementById("type");
const tagsInput = document.getElementById("tags");
const priorityInput = document.getElementById("priority");
const tokenInput = document.getElementById("token");
const saveTokenBtn = document.getElementById("saveTokenBtn");
const resourceForm = document.getElementById("resourceForm");
const message = document.getElementById("message");

const showMessage = (text, type = "success") => {
  message.textContent = text;
  message.className = type;
};

const loadSavedToken = () => {
  const savedToken = localStorage.getItem("recallToken");

  if (savedToken) {
    tokenInput.value = savedToken;
  }
};

const saveToken = () => {
  const token = tokenInput.value.trim();

  if (!token) {
    showMessage("Please paste your token first", "error");
    return;
  }

  localStorage.setItem("recallToken", token);
  showMessage("Token saved successfully");
};

const loadCurrentTab = async () => {
  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const currentTab = tabs[0];

    if (!currentTab) {
      showMessage("Unable to read current tab", "error");
      return;
    }

    titleInput.value = currentTab.title || "";
    urlInput.value = currentTab.url || "";
  } catch (error) {
    showMessage("Something went wrong while reading the tab", "error");
  }
};

const saveResourceToBackend = async (resourceData, token) => {
  const response = await fetch(`${API_URL}/resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resourceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to save resource");
  }

  return data;
};

resourceForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = tokenInput.value.trim();

  if (!token) {
    showMessage("Please paste and save your token first", "error");
    return;
  }

  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");

  const resourceData = {
    title: titleInput.value,
    url: urlInput.value,
    description: descriptionInput.value,
    type: typeInput.value,
    tags,
    priority: priorityInput.value,
  };

  try {
    showMessage("Saving resource...");

    await saveResourceToBackend(resourceData, token);

    localStorage.setItem("recallToken", token);

    descriptionInput.value = "";
    tagsInput.value = "";

    showMessage("Resource saved to Recall successfully");
  } catch (error) {
    showMessage(error.message, "error");
  }
});

saveTokenBtn.addEventListener("click", saveToken);

loadSavedToken();
loadCurrentTab();