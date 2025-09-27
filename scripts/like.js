const likeBtn = document.getElementById("likeButton");
const likeCount = document.getElementById("likeCount");
const likeMessage = document.getElementById("likeMessage");

let count = 0;
let liked = false;

likeBtn.addEventListener("click", () => {
  if (!liked) {
    count++;
    likeCount.textContent = count;
    likeMessage.classList.remove("hidden");
    liked = true;
  } else {
    count--;
    likeCount.textContent = count;
    likeMessage.classList.add("hidden");
    liked = false;
  }
});