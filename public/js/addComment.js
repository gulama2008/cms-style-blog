//handdleer function of clicking add-comment button
const newCommentHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector("#comment-content").value.trim();
    if (content) {
        if (event.target.hasAttribute("data-id")&&event.target.hasAttribute("user-id")) {
            const post_id = event.target.getAttribute("data-id");
            const user_id = event.target.getAttribute("user-id");
            const response = await fetch(`/api/comments`, {
              method: "POST",
              body: JSON.stringify({ content, post_id, user_id }),
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
    }
};

document
  .querySelector(".add-comment-form")
  .addEventListener("submit", newCommentHandler);
