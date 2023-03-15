let commentUsers = document.querySelectorAll('.comment-user');
let updateBtn = document.querySelectorAll('.update-comment-container');
const user = document.querySelector('.post-container').getAttribute('data-login');

for (let i = 0; i < commentUsers.length; i++) { 
    if (commentUsers[i].getAttribute('data-user') !== user) { 
        console.log(updateBtn[i]);
        console.log(11111);
        updateBtn[i].style.visibility = "hidden";
    }
}