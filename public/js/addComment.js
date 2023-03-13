const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-content").value.trim();

    if (content) {
        const post_id = event.target.getAttribute('data-id');
        const user_id = event.target.getAttribute("user-id");
        const response = await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ content,post_id,user_id }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/post");
        } else {
            alert("Failed to create comment");
        }
    }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);
