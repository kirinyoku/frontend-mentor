let questions = document.getElementsByClassName("question");
let box = document.querySelector(".illustration-box");

for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener("click", function() {
    let answer = this.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
        let active = document.querySelectorAll(".question.active");
        for (let j = 0; j < active.length; j++) {
            active[j].classList.remove("active");
            active[j].nextElementSibling.style.maxHeight = null;
        }
        this.classList.toggle("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
    } 
  });
  questions[i].addEventListener("mouseover", moveBox);
  questions[i].addEventListener("mouseout", returnBox);
}

function moveBox() {
  box.style.left = "-125px";
}

function returnBox() {
  box.style.left = "-93px";
}