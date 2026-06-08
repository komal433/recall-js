const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const descriptionInput = document.getElementById("description");
const typeInput = document.getElementById("type");
const tagsInput = document.getElementById("tags");
const priorityInput = document.getElementById("priority");
const resourceForm = document.getElementById("resourceForm");
const message = document.getElementById("message");

const loadCurrentTab = async () => {
  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const currentTab = tabs[0];

    if (!currentTab) {
      message.textContent = "Unable to read current tab";
      return;
    }

    titleInput.value = currentTab.title || "";
    urlInput.value = currentTab.url || "";
  } catch (error) {
    message.textContent = "Something went wrong while reading the tab";
  }
};

resourceForm.addEventListener("submit", (event) => {
  event.preventDefault();

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

  console.log("Resource ready to save:", resourceData);

  message.textContent = "Resource ready. Backend connection will be added on Day 24.";
});

loadCurrentTab();