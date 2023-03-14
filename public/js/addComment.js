const newCommentHandler = async (event) => {
  event.preventDefault();
    console.log(123);
    
  const content = document.querySelector("#comment-content").value.trim();
    
    
    if (content) {
        console.log(1233313);
        console.log(event.target.hasAttribute("data-id"));
        if (event.target.hasAttribute("data-id")&&event.target.hasAttribute("user-id")) {
            const post_id = event.target.getAttribute("data-id");
            const user_id = event.target.getAttribute("user-id");
            console.log(post_id);
            console.log(user_id);
            const response = await fetch(`/api/comments`, {
              method: "POST",
              body: JSON.stringify({ content, post_id, user_id }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              console.log(342143124);
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

// function test() { 
//     const btn = document.querySelector(".add-comment-form");
//     const post_id = btn.getAttribute("data-id");
//     const user_id = btn.getAttribute("user-id");
//     console.log(post_id);
//     console.log(user_id);
// };
// test();