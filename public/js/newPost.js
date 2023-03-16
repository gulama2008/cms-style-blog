const mainTitle = document.querySelector(".main-title");
mainTitle.textContent = "Your Dashboard";

const newFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the post form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
