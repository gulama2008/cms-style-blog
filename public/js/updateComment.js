const updateCommentHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector("#comment-content").value.trim();
  if (content) {
    // if (
    //   event.target.hasAttribute("data-id") &&
    //   event.target.hasAttribute("user-id")
    // ) {
      const id = event.target.getAttribute("data-comment-id");
      const post_id = event.target.getAttribute("data-post-id");
      const user_id = event.target.getAttribute("data-user-id");
      const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id,content, post_id, user_id }),
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
//   }
};

document
  .querySelector(".update-comment-form")
  .addEventListener("submit", updateCommentHandler);
