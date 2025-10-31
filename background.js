chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "pause") {
    speechSynthesis.pause();
  } else if (message.action === "stop") {
    speechSynthesis.cancel();
  }
});
