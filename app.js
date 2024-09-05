const Correct = "WIDEN";

let index = 0;
let attempts = 0;
let stoper;
function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display: flex;  justify-content: center; align-items: center;  position: absolute;   top: 40vh;  left: 45vw;  background-color: white;  width: 200px;   height: 100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    alert("게임종료");
    displayGameover();
    clearInterval(timer);
  };
  const handleBackspace = () => {
    if (index > 0) {
      const Block = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      Block.innerText = "";
      if (index != 0) index--;
    }
  };
  const startTimer = () => {
    const start = new Date();
    function setTimer() {
      const time = new Date();
      const late_time = new Date(time - start);
      const min = late_time.getMinutes().toString();
      const sec = late_time.getSeconds().toString();
      const Clock = document.querySelector("#Clock");
      Clock.innerText = `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }
    stoper = setInterval(setTimer, 1000);
  };

  const nextLine = () => {
    attempts++;
    index = 0;
    if (attempts === 6) gameover();
  };
  const handleEnterKey = () => {
    point = 0;
    console.log("확인점;");
    for (let i = 0; i < 5; i++) {
      const Answer = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const InputText = Answer.innerText;
      const CorrectText = Correct[i];
      if (InputText == CorrectText) {
        point++;
        Answer.style.background = "#6AAA64";
        console.log(point);
      } else if (Correct.includes(InputText))
        Answer.style.background = "#C9B458";
      else Answer.style.background = "#D3D6DA";
    }
    if (point === 5) gameover();
    else nextLine();
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    console.log(event.key, event.keyCode);
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key == "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key == "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
