function addActiveAnimation(id) {
  const btn = document.getElementById(id);
  btn.classList.add('active');
  setTimeout(() => btn.classList.remove('active'), 1000);
}

// Play button
document.getElementById("play").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        const utterance = new SpeechSynthesisUtterance(selectedText);
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Please select some text on the page first!");
      }
    },
  });
  addActiveAnimation("play");
});

// Pause button
document.getElementById("pause").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.speechSynthesis.pause(),
  });
  addActiveAnimation("pause");
});

// Stop button
document.getElementById("stop").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.speechSynthesis.cancel(),
  });
  addActiveAnimation("stop");
});
