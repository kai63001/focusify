self.onmessage = (event) => {
  let timerSeconds = event.data;
  const intervalId = setInterval(() => {
    timerSeconds -= 1;
    if (timerSeconds === 0) {
      clearInterval(intervalId);
    }
    postMessage(timerSeconds);
  }, 1000);
};
