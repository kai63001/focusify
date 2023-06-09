import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";

const PomodoroMain = () => {
  const dispatch = useAppDispatch();
  const closePomodoroApp = () => {
    dispatch(setOpenApp({ app: "appPomodoro", isShow: false }));
  };

  const [timerState, setTimerState] = useState("stopped"); // "stopped", "running", or "paused"
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // default to 25 minutes in seconds
  const [timerMode, setTimerMode] = useState("pomodoro"); // "pomodoro", "shortBreak", or "longBreak"
  const [pomodoroCount, setPomodoroCount] = useState(0); // How many pomodoros completed

  const workerRef: any = useRef(null);

  const startTimer = () => {
    setTimerState("running");
    workerRef.current = new Worker("/timerWorker.js");

    workerRef.current.onmessage = (event: any) => {
      setTimerSeconds(event.data);
      if (event.data === 0) {
        resetTimer();
      }
    };
    workerRef.current.postMessage(timerSeconds);
  };

  const pauseTimer = () => {
    setTimerState("paused");
    if (workerRef.current) {
      workerRef.current.terminate();
    }
  };

  const resetTimer = (autoChange = true) => {
    setTimerState("stopped");
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    //reset the timer with timerMode
    // Increment the pomodoro counter and determine the new timer mode
    if (autoChange) {
      if (timerMode === "pomodoro") {
        const newPomodoroCount = pomodoroCount + 1;
        const newTimerMode: any =
          newPomodoroCount % 4 === 0 ? "longBreak" : "shortBreak";

        // Update the state with the new timer mode and seconds
        setPomodoroCount(newPomodoroCount);
        setTimerMode(newTimerMode);
        switch (newTimerMode) {
          case "pomodoro":
            setTimerSeconds(25 * 60);
            break;
          case "shortBreak":
            setTimerSeconds(5 * 60);
            break;
          case "longBreak":
            setTimerSeconds(15 * 60);
            setPomodoroCount(0);
            break;
          default:
            setTimerSeconds(25 * 60);
        }
      } else {
        setTimerSeconds(25 * 60);
        setTimerMode("pomodoro");
      }
    } else {
      switch (timerMode) {
        case "pomodoro":
          setTimerSeconds(25 * 60);
          break;
        case "shortBreak":
          setTimerSeconds(5 * 60);
          break;
        case "longBreak":
          setTimerSeconds(15 * 60);
          break;
        default:
          setTimerSeconds(25 * 60);
      }
    }
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = event.target.value;
    setTimerMode(mode);
    switch (mode) {
      case "pomodoro":
        setTimerSeconds(25 * 60);
        break;
      case "shortBreak":
        setTimerSeconds(5 * 60);
        break;
      case "longBreak":
        setTimerSeconds(15 * 60);
        break;
      default:
        setTimerSeconds(25 * 60);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="bg-primary bg-opacity-95 backdrop-blur-lg border border-primaryLight rounded-md text-sm w-[450px]"
    >
      <div className="flex justify-between">
        <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
          <i
            onClick={closePomodoroApp}
            className="fi fi-rr-horizontal-rule cursor-pointer"
          ></i>
        </div>
        <div className="w-full cursor-grab handle"></div>
        <div className="px-5 pt-4 pb-2 items-center flex space-x-2"></div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 pt-5 pb-10">
        {/* create tab here */}
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setTimerState("stopped");
              if (workerRef.current) {
                workerRef.current.terminate();
              }
              setTimerMode("pomodoro");
              setTimerSeconds(25 * 60);
            }}
            className={`${
              timerMode === "pomodoro" ? "bg-primaryLight text-white" : ""
            } px-4 py-2 rounded-md`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => {
              setTimerState("stopped");
              if (workerRef.current) {
                workerRef.current.terminate();
              }
              setTimerMode("shortBreak");
              setTimerSeconds(5 * 60);
            }}
            className={`${
              timerMode === "shortBreak" ? "bg-primaryLight text-white" : ""
            } px-4 py-2 rounded-md`}
          >
            Short Break
          </button>
          <button
            onClick={() => {
              setTimerState("stopped");
              if (workerRef.current) {
                workerRef.current.terminate();
              }
              setTimerMode("longBreak");
              setTimerSeconds(15 * 60);
            }}
            className={`${
              timerMode === "longBreak" ? "bg-primaryLight text-white" : ""
            } px-4 py-2 rounded-md`}
          >
            Long Break
          </button>
        </div>

        <div className="text-4xl font-bold my-5">
          {Math.floor(timerSeconds / 60)
            .toString()
            .padStart(2, "0")}
          :{(timerSeconds % 60).toString().padStart(2, "0")}
        </div>
        <div className="flex space-x-4">
          {timerState === "stopped" || timerState === "paused" ? (
            <button
              className={"bg-primaryLight text-white px-4 py-2 rounded-md"}
              onClick={startTimer}
            >
              Start
            </button>
          ) : (
            <button
              className={"bg-primaryDark2 text-white px-4 py-2 rounded-md"}
              onClick={pauseTimer}
            >
              Pause
            </button>
          )}
          <button onClick={(e) => resetTimer(false)}>
            <i className="fi fi-br-refresh"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PomodoroMain;
