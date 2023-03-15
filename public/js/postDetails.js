const commentUsers = document.querySelectorAll('.comment-user');
const updateBtn = document.querySelectorAll('.update-comment-container');
const deleteBtn=document.querySelectorAll('.delete-comment-container')
const user = document.querySelector('.post-container').getAttribute('data-login');

const deleteCommentHandler = async (event) => {
  event.preventDefault();
    const id = event.target.getAttribute("data-comment-id");
    console.log(id);
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
    if (response.ok) {
      post_id=document.querySelector('.post-container').getAttribute('data-post-id')
    document.location.replace(`/api/posts/details/${post_id}`);
  } else {
    alert("Failed to delete comment");
  }
};

for (let i = 0; i < commentUsers.length; i++) { 
    deleteBtn[i].addEventListener("click", deleteCommentHandler);
    if (commentUsers[i].getAttribute('data-user') !== user) { 
        console.log(updateBtn[i]);
        console.log(11111);
        updateBtn[i].style.visibility = "hidden";
        deleteBtn[i].style.visibility = "hidden";
    }
}




