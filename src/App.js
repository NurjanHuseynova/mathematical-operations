import { useEffect, useState } from "react";
import { Button, Input, Table } from "reactstrap";
import AudioPlay from "../src/assets/audio/true.mp3";
import AudioPause from "../src/assets/audio/wrong.mp3";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/css/style.css";

function App() {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [operators, setOperators] = useState("");
  const [result, setResult] = useState("");
  const [res, setRes] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    let arr = window.localStorage.getItem("calcTable");
    setRes(arr);
    handleClick();
  }, []);

  setTimeout(function () {
    window.location.reload();
  }, 10000);

  const countDown = () => {
    let timeleft = 10;
    let downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        handleClick();

        clearInterval(downloadTimer);

        document.getElementById("countdown").innerHTML = "!";
      } else {
        document.getElementById("countdown").innerHTML = timeleft;
      }
      timeleft -= 1;
    }, 1000);
  };

  const handleClick = () => {
    const min = 1;
    const max = 10;
    const operators = ["+", "-", "x"];
    const randomFirst = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomSecond = Math.floor(Math.random() * (max - min + 1)) + min;

    const randomOperators =
      operators[Math.floor(Math.random() * operators.length)];

    setFirstValue(randomFirst);
    setSecondValue(randomSecond);
    setOperators(randomOperators);
    countDown();
  };

  const checkCalc = () => {
    if (operators == "+" && firstValue + secondValue == result) {
      play_Audio();
      toast.success("Wow so easy!");

      calcTable();
      handleClick();
      setResult("");
    } else if (operators == "-" && firstValue - secondValue == result) {
      play_Audio();
      toast.success("Wow so easy!");

      calcTable();
      handleClick();
      setResult("");
    } else if (operators == "x" && firstValue * secondValue == result) {
      play_Audio();
      toast.success("Wow so easy!");

      calcTable();
      handleClick();
      setResult("");
    } else {
      pause_Audio();
      toast.error("Warning!");

      calcTable();
      handleClick();
      setResult("");
    }
  };

  const calcTable = () => {
    let obj = {
      question: `${firstValue} ${operators} ${secondValue}`,
      answer: result,
    };
    let arr = localStorage.getItem("calcTable");
    let list = arr ? JSON.parse(arr) : [];
    list.push(obj);
    localStorage.setItem("calcTable", JSON.stringify(list));
    setArr(list);
  };

  let playTrue = document.getElementById("myAudio");
  let playWrong = document.getElementById("myAudios");

  function play_Audio() {
    playTrue.play();
  }

  function pause_Audio() {
    playWrong.play();
  }

  return (
    <div>
      <div id="countdown"></div>

      <div className="container calc">
        <Input
          type="number"
          name="number"
          style={{ width: "10%", marginRight: "20px" }}
          value={firstValue}
          onChange={() => setFirstValue()}
        />
        <Input
          style={{ width: "5%", marginRight: "20px" }}
          value={operators}
          onChange={() => setOperators()}
        />

        <Input
          type="number"
          name="number"
          style={{ width: "10%", marginRight: "20px" }}
          value={secondValue}
          onChange={() => setSecondValue()}
        />
        <p style={{ marginRight: "18px" }}>=</p>
        <Input
          type="number"
          name="number"
          style={{ width: "15%", marginRight: "20px" }}
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />

        <Button outline onClick={() => checkCalc()}>
          {"check"}
        </Button>
      </div>

      <div className="container tableCalc">
        <Table bordered>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((v, i) => (
              <tr key={i}>
                <td>{v.question}</td>
                <td>{v.answer}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <audio src={AudioPlay} id="myAudio" />

        <audio src={AudioPause} id="myAudios" />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
