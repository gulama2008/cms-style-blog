const commentUsers = document.querySelectorAll('.comment-user');
const updateBtn = document.querySelectorAll('.update-comment-container');
const deleteBtn=document.querySelectorAll('.delete-comment-container')
const user = document.querySelector('.post-container').getAttribute('data-login');

//add delete comment function to the delete button on comments which created by the current user
const deleteCommentHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-comment-id");
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
    if (response.ok) {
      post_id = document
        .querySelector(".post-container")
        .getAttribute("data-post-id");
      // If comment delete successfully, refresh the postDetails page to show the updated comments list
      document.location.replace(`/api/posts/details/${post_id}`);
    } else {
    alert("Failed to delete comment");
  }
};

// if the comment is created by the current user, then show the update and delete button for the user to operate
for (let i = 0; i < commentUsers.length; i++) { 
    deleteBtn[i].addEventListener("click", deleteCommentHandler);
    if (commentUsers[i].getAttribute('data-user') !== user) { 
        updateBtn[i].style.visibility = "hidden";
        deleteBtn[i].style.visibility = "hidden";
    }
}




