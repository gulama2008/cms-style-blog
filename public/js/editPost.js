//showing "Your Dashboard" instead of "Tech Blog" in the header when staying on editPost page
const mainTitle = document.querySelector(".main-title");
mainTitle.textContent = "Your Dashboard";

//handler function for updating existing post
const updatePostHandler = async (event) => {
  event.preventDefault();
  // Collect values from the post form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  if (title && content) {
    if (event.target.hasAttribute("data-id")) {
      // get post id by getting data-id attribute passed from last api call when rendering the page
      const id = event.target.getAttribute("data-id");
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update post");
      }
    }
  }
};

//handler function for delete existing post
const deletePostHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector("#update-btn")
  .addEventListener("click", updatePostHandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", deletePostHandler);
