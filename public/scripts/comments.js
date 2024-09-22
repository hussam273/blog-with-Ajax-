const commentsBtn = document.getElementById("btn-load-comments");
const commentsElement = document.getElementById("comments");
const formElement = document.querySelector("#comments-form form");

async function showAllComments(e) {
    const postId = e.target.dataset.id;
    const respons = await fetch(`/posts/${postId}/comments`);
    const responsData = await respons.json();
    if(!responsData || responsData.length === 0){
        commentsElement.firstElementChild.textContent = "there is no comments";
        return;
    }
    const commentsList = document.createElement("ol");
    for (const comment of responsData) {
        const commentItem = document.createElement("li");
        commentItem.innerHTML = `
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;
        commentsList.appendChild(commentItem);
    }
    commentsElement.innerHTML = "";
    commentsElement.appendChild(commentsList);
}

commentsBtn.addEventListener("click",showAllComments);

formElement.addEventListener("submit",async function(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const text = formData.get("text");
    const id = event.target.dataset.id;
    await fetch(`/posts/${id}/comments`, {
        method : "POST",
        body : JSON.stringify({title : title, text : text}),
        headers : {
            "Content-Type" : "application/json"
        }
    });
    showAllComments(event);
})
