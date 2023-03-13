const newCommentHandler = async (event) => {
  event.preventDefault();
console.log(123);
  const content = document.querySelector("#comment-content").value.trim();
    const post_id = event.target.getAttribute("data-id");
    const user_id = event.target.getAttribute("user-id");
    console.log(post_id);
    if (content) {
        
        const response = await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ content,post_id,user_id }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log(342143124);
            // document.location.replace(`/api/posts/details/${post_id}`);
        } else {
            alert("Failed to create comment");
        }
    }
};

document
  .querySelector(".add-comment-form")
  .addEventListener("submit", newCommentHandler);
