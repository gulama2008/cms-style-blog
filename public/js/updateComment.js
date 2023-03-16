const updateCommentHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector("#comment-content").value.trim();
    if (content) {
      // Collect id,post_id,user_id from the attributes to pass to the request body for updating
      const id = event.target.getAttribute("data-comment-id");
      const post_id = event.target.getAttribute("data-post-id");
      const user_id = event.target.getAttribute("data-user-id");
      // Send a PUT request to the API endpoint to update the comment with certain id
      const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id, content, post_id, user_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace(`/api/posts/details/${post_id}`);
      }
    } else {
      alert("Failed to create comment");
    }
};

document
  .querySelector(".update-comment-form")
  .addEventListener("submit", updateCommentHandler);
