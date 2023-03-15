const mainTitle = document.querySelector(".main-title");
mainTitle.textContent = "Your Dashboard";

const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
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

function test() {
  const btn = document.querySelector("#update-btn");
  const id = btn.getAttribute("data-id");
  console.log(id);
}

test();
