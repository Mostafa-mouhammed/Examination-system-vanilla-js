let User = JSON.parse(localStorage.getItem("User"));
let score = localStorage.getItem("score");
$("h3").text(`${User.FirstName} ${User.LastName}`);
$(".MyScore").text(score);

let arr = JSON.parse(localStorage.getItem("Array"));
console.log(arr);

let DisplayResult = () => {
  for (let i = 0; i < arr.length; i++) {
    let e = $(
      `<div class="ResultDivs"><h2>${i + 1}- ${arr[i].title}</h2></div>`
    );
    let selectedAns = arr[i].selectedAnswer;
    let CorrectAns = arr[i].correctAnswer;
    $(e).append(
      `<span class="correcticons"><i class="fa-solid fa-xmark"></i> Incorrect</span>`
    );
    for (let j = 0; j < arr[i].answers.length; j++) {
      if (selectedAns && selectedAns === arr[i].answers[j].key) {
        if (selectedAns === CorrectAns) {
          $(e).append(
            $(
              `<p> ${arr[i].answers[j].key}- ${arr[i].answers[j].title} <span>Your Answer </span> </p>`
            ).css("background-color", "#a1cfa1")
          );
          $(e).append(
            `<span class="correcticons"><i class="fa-solid fa-check"></i> Correct</span>`
          );
        } else if (selectedAns !== CorrectAns) {
          $(e).append(
            $(`<p>
                    ${arr[i].answers[j].key}- ${arr[i].answers[j].title} <span>Your Answer </span> </p>`).css(
              "background-color",
              arr[i].answers[j].key === CorrectAns ? "#a1cfa1" : "#ebbcbc"
            )
          );
        } else {
          $(e).append(
            $(
              `<p>${arr[i].answers[j].key}- ${arr[i].answers[j].title} <span>Your Answer </span> </p>`
            ).css(
              "background-color",
              arr[i].answers[j].key === CorrectAns ? "#a1cfa1" : "#ebbcbc"
            )
          );
        }
      } else {
        $(e).append(
          $(`<p>${arr[i].answers[j].key}- ${arr[i].answers[j].title} </p>`).css(
            "background-color",
            arr[i].answers[j].key === CorrectAns ? "#a1cfa1" : "#ebbcbc"
          )
        );
      }
    }

    $("#Your_Answers").append(e);
  }
};

DisplayResult();

score > 4
  ? ($("#Sucssess").show(), $("#Failed").hide())
  : ($("#Sucssess").hide(), $("#Failed").show());